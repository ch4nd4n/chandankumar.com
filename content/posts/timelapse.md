---
title: Timelapse Livingstone Daisy on a Nikon DSLR
slug: /tutorial/apple-m1-fly-docker-issue
date: 2021-11-11T19:27:52.809Z
tag:
    - tutorial
---
Livingstone Daisy Timelapse using Nikon D5000 over a period of few hours.

<iframe width="560" height="315" src="https://www.youtube.com/embed/Yst4UvUhpxo" frameborder="0" allow="accelerometer; picture-in-picture" allowfullscreen></iframe>

This Timelapse comprises of little over 700 frames at 4k pixels.

### Steps

Outlining what it took to create this.

1. Camera: Nikon D5000
2. Tripod: Manfrotto
3. Flower: Livingstone Daisy
4. Setup camera, frame the subject
5. Start interval shooting.
6. Shoot 100s or 1000s of images
7. Transfer the image and run the following ffmpeg command
8. Transfer to youtube
9. Blog about it after an year or so.

```bash
ffmpeg -r 60 -pattern_type glob -i '*.JPG' -s hd1080 -vcodec libx264 -pix_fmt yuv420p tl-1080.mp4
```


Resolution

4k UHD - `3840 x 2160`

1k - `1920x1080`

