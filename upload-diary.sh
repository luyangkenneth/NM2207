ssh -t A0124007X@nm2207.org 'rm -rf ~/diarydir'
scp -r ./diary/_site/ A0124007X@nm2207.org:~/diarydir/
