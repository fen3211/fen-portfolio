# -*- coding: utf-8 -*-
import json, os, time, zipfile, urllib.request, urllib.parse, urllib.error

PUB = "https://disk.yandex.ru/d/__RvZMZojUuCsQ"
ROOT = os.path.dirname(os.path.abspath(__file__))
PUBDIR = os.path.join(ROOT, "public", "assets")
TMP = os.path.join(ROOT, "refs")
MANIFEST = []
FAILS = []

def api_download_href(path, attempts=30):
    """Correct endpoint: /v1/disk/public/resources/download -> {href}"""
    url = "https://cloud-api.yandex.net/v1/disk/public/resources/download?" + urllib.parse.urlencode(
        {"public_key": PUB, "path": path}
    )
    wait = 10
    for attempt in range(attempts):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=90) as r:
                d = json.loads(r.read().decode())
                return d["href"]
        except urllib.error.HTTPError as e:
            if e.code in (429, 503):
                ra = e.headers.get("Retry-After")
                w = float(ra) if ra and ra.replace(".", "").isdigit() else wait
                print(f"  429/503, sleep {w:.0f}s (attempt {attempt+1})", flush=True)
                time.sleep(min(w, 180))
                wait = min(wait * 1.5, 180)
            else:
                raise
        except Exception:
            time.sleep(wait)
            wait = min(wait * 1.5, 180)
    raise RuntimeError("api retries exhausted: " + path)

def big_download(href, dest, attempts=6):
    wait = 10
    for attempt in range(attempts):
        try:
            req = urllib.request.Request(href, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=3600) as r, open(dest + ".part", "wb") as f:
                done = 0
                last_report = 0
                while True:
                    chunk = r.read(1 << 22)
                    if not chunk:
                        break
                    f.write(chunk)
                    done += len(chunk)
                    if done - last_report >= (25 << 20):
                        print(f"  ...{done/1e6:.0f} MB", flush=True)
                        last_report = done
            os.replace(dest + ".part", dest)
            print(f"downloaded {dest}: {os.path.getsize(dest)/1e6:.0f} MB", flush=True)
            return
        except urllib.error.HTTPError as e:
            if e.code in (429, 503):
                time.sleep(min(wait, 180)); wait = min(wait * 1.5, 180)
            else:
                raise
        except Exception:
            time.sleep(wait)
            wait = min(wait * 1.5, 180)
    raise RuntimeError("download retries exhausted")

def fix_zip_name(zi):
    name = zi.filename
    if zi.flag_bits & 0x800:
        return name
    try:
        return name.encode("cp437").decode("utf-8")
    except Exception:
        return name

def slug(i, prefix, ext):
    return f"{prefix}-{i:02d}.{ext}"

def save_bytes(data, local_rel, orig, media):
    local = os.path.join(PUBDIR, local_rel)
    os.makedirs(os.path.dirname(local), exist_ok=True)
    if os.path.exists(local) and os.path.getsize(local) == len(data):
        return
    with open(local, "wb") as f:
        f.write(data)
    MANIFEST.append({"local": "assets/" + local_rel.replace(os.sep, "/"), "orig": orig, "size": len(data), "media": media})

def norm(s):
    return s.lower().replace(" ", "").replace("ё", "е")

# ---------------- дизайн: images ----------------
def extract_design(z):
    counters = {}
    docx_data = None
    for zi in z.infolist():
        if zi.is_dir():
            continue
        name = fix_zip_name(zi)
        low = name.lower()
        if low.endswith(".docx"):
            docx_data = z.read(zi)
            continue
        if not low.endswith((".png", ".jpg", ".jpeg", ".webp", ".gif")):
            continue
        parts = name.split("/")
        # find "дизайн" in path
        if "дизайн" not in [norm(p) for p in parts]:
            continue
        idx_d = [norm(p) for p in parts].index("дизайн")
        rest = parts[idx_d + 1:]
        if not rest:
            continue
        folder = rest[0]
        fn = rest[-1]
        ext = fn.rsplit(".", 1)[-1].lower()
        data = z.read(zi)
        if folder == "превью":
            if len(rest) != 2:
                continue
            counters["yt"] = counters.get("yt", 0) + 1
            rel = os.path.join("projects", "yt", slug(counters["yt"], "yt", ext))
        elif folder == "аватарки":
            counters["ava"] = counters.get("ava", 0) + 1
            rel = os.path.join("projects", "avatars", slug(counters["ava"], "ava", ext))
        elif folder == "другие приколы":
            counters["misc"] = counters.get("misc", 0) + 1
            rel = os.path.join("projects", "misc", slug(counters["misc"], "misc", ext))
        elif folder == "шаблоны для телеграмм каналов":
            if len(rest) == 2:
                counters["tg"] = counters.get("tg", 0) + 1
                rel = os.path.join("projects", "telegram", slug(counters["tg"], "tg", ext))
            elif len(rest) >= 3 and rest[1] == "Eblan Awards":
                if len(rest) == 3:
                    counters["aw"] = counters.get("aw", 0) + 1
                    base = "aw-cover" if counters["aw"] <= 2 else "aw-extra"
                    rel = os.path.join("projects", "eblan-awards", f"{base}-{counters['aw']}.{ext}")
                elif len(rest) == 4 and rest[2] == "номинации":
                    counters["awn"] = counters.get("awn", 0) + 1
                    rel = os.path.join("projects", "eblan-awards", "nominations", slug(counters["awn"], "awn", ext))
                elif len(rest) == 4 and rest[2] == "стикеры":
                    counters["aws"] = counters.get("aws", 0) + 1
                    rel = os.path.join("projects", "eblan-awards", "stickers", slug(counters["aws"], "aws", ext))
                else:
                    continue
            else:
                continue
        else:
            continue
        save_bytes(data, rel, name, "image")
        print("img:", rel, flush=True)
    if docx_data:
        with open(os.path.join(TMP, "video-links.docx"), "wb") as f:
            f.write(docx_data)
        print("docx saved", flush=True)

# ---------------- монтаж + 3д: videos + 3d images ----------------
WANTED = {
    "3д/не стинт интро оверлей.mp4": "videos/ne-stint-intro-overlay.mp4",
    "баннер+анимации/лого.mp4": "videos/logo.mp4",
    "баннер+анимации/лого2.mp4": "videos/logo-2.mp4",
    "баннер+анимации/лого3.mp4": "videos/logo-3.mp4",
    "баннер+анимации/лого4.mp4": "videos/logo-4.mp4",
    "баннер+анимации/анимка.mp4": "videos/anim.mp4",
    "баннер+анимации/баннеркконкурсу.mp4": "videos/banner-contest.mp4",
    "баннер+анимации/тестовоезадание.mp4": "videos/test-task.mp4",
    "баннер+анимации/текст.mp4": "videos/text.mp4",
    "lyricsвидео/переболивомнемоятоска.mp4": "videos/lyrics-pereboli.mp4",
    "lyricsвидео/пожалуйстаненадо.mp4": "videos/lyrics-ne-nado.mp4",
    "3д/photo_2024-12-08_01-23-05.jpg": "projects/three-d/3d-01.jpg",
    "3д/photo_2025-03-01_17-15-32.jpg": "projects/three-d/3d-02.jpg",
}

def extract_motion(z):
    taken = set()
    for zi in z.infolist():
        if zi.is_dir():
            continue
        name = fix_zip_name(zi)
        parts = name.split("/")
        joined = "/".join(parts)
        n = norm(joined)
        for key, target in WANTED.items():
            if key in taken:
                continue
            kn = norm(key)
            # match by suffix of the path
            if n.endswith(kn):
                data = z.read(zi)
                if target.startswith("videos/"):
                    local = os.path.join(PUBDIR, target)
                    os.makedirs(os.path.dirname(local), exist_ok=True)
                    with open(local, "wb") as f:
                        f.write(data)
                    MANIFEST.append({"local": "assets/" + target, "orig": name, "size": len(data), "media": "video"})
                    print("video:", target, f"{len(data)/1e6:.0f} MB", flush=True)
                else:
                    save_bytes(data, target, name, "image")
                    print("3d img:", target, flush=True)
                taken.add(key)
                break
    missing = [k for k in WANTED if k not in taken]
    for m in missing:
        FAILS.append({"path": m, "err": "not found in zip"})
        print("MISSING:", m, flush=True)

if __name__ == "__main__":
    os.makedirs(TMP, exist_ok=True)
    mpath = os.path.join(TMP, "asset-manifest.json")
    if os.path.exists(mpath):
        try:
            MANIFEST = json.load(open(mpath, encoding="utf-8"))
        except Exception:
            MANIFEST = []

    zp = os.path.join(TMP, "design.zip")
    if not os.path.exists(zp):
        href = api_download_href("/дизайн")
        big_download(href, zp)
    else:
        print("design.zip exists, skip download", flush=True)
    with zipfile.ZipFile(zp) as z:
        extract_design(z)

    zp2 = os.path.join(TMP, "motion.zip")
    if not os.path.exists(zp2):
        href = api_download_href("/монтаж + 3д")
        big_download(href, zp2)
    else:
        print("motion.zip exists, skip download", flush=True)
    with zipfile.ZipFile(zp2) as z:
        extract_motion(z)

    json.dump(MANIFEST, open(mpath, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    json.dump(FAILS, open(os.path.join(TMP, "fetch-fails.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("DONE. manifest:", len(MANIFEST), "fails:", len(FAILS), flush=True)
