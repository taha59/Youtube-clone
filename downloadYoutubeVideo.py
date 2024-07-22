from pytubefix import YouTube
import sys

def main():
    url = sys.argv[1]
    yt = YouTube(url)

    ys = yt.streams.filter(file_extension='mp4')
    ys[0].download("tmp/")
    print(yt.title)

if __name__ == "__main__":
    main()