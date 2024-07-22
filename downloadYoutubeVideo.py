from pytubefix import YouTube
import sys
import re

def main():
    url = sys.argv[1]
    yt = YouTube(url)

    ys = yt.streams.filter(file_extension='mp4').get_highest_resolution()
    print(ys.download("tmp/", "tempVideo.mp4"))
    print(yt.thumbnail_url)

if __name__ == "__main__":
    main()