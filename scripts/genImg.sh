#!/bin/bash
set +e

# brew install joedrago/repo/avifenc
# brew install webp


# 生成 webp，avif 格式图片

# path：要生成图片的目录，如果不传，则为../public/png
pngPath=$1
if [ ! -n "$pngPath" ]; then
  pwd=$(pwd)
  pngPath=$pwd/public/png
fi
webpPath=$pwd/public/webp
avifPath=$pwd/public/avif

echo "pngPath: $pngPath"

if [ ! -d "$pngPath" ]; then
  echo "目录不存在"
  exit 1
fi

function png2webp() {
  for file in `ls $1`
  do
    if [ -d $1"/"$file ]; then
      png2webp $1"/"$file
    else
      if [ ! -d ${1/$pngPath/$webpPath} ]; then
        mkdir -p ${1/$pngPath/$webpPath}
      fi
      cwebp -q 80 $1"/"$file -o ${1/$pngPath/$webpPath}"/"${file/.png/.webp}
    fi
  done
}

# function png2avif() {
#   for file in `ls $1`
#   do
#     if [ -d $1"/"$file ]; then
#       png2avif $1"/"$file
#     else
#       if [ ! -d ${1/$pngPath/$avifPath} ]; then
#         mkdir -p ${1/$pngPath/$avifPath}
#       fi
#       ffmpeg -i $1"/"$file -compression_level 20 -pix_fmt yuv444p10le -color_primaries bt709 -color_trc bt709 -colorspace bt709 -c:v av1 -strict experimental -b:v 0 -crf 30 -y ${1/$pngPath/$avifPath}"/"${file/.png/.avif}
#     fi
#   done
# }

png2webp $pngPath
# png2avif $pngPath