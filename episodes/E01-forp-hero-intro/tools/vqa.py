import cv2, numpy as np, sys, os
SB="/tmp/claude-0/-home-user-Fantastical-elements/19343945-c2b6-5e72-a403-18cdc0433497/scratchpad"
FR="/home/user/Fantastical-elements/site/public/frames"
mp4=sys.argv[1]; startk=sys.argv[2]; endk=sys.argv[3]; tag=sys.argv[4]
def load(p): 
    im=cv2.imread(p); return im
def norm(im,sz=(640,360)): return cv2.resize(im,sz)
def sim(a,b):
    a=norm(a); b=norm(b)
    # histogram correlation (0..1) + inverse-MSE similarity
    ha=cv2.calcHist([a],[0,1,2],None,[8,8,8],[0,256,0,256,0,256]); cv2.normalize(ha,ha)
    hb=cv2.calcHist([b],[0,1,2],None,[8,8,8],[0,256,0,256,0,256]); cv2.normalize(hb,hb)
    corr=cv2.compareHist(ha,hb,cv2.HISTCMP_CORREL)
    mse=np.mean((a.astype(np.float32)-b.astype(np.float32))**2)
    # grayscale structural corr
    ga=cv2.cvtColor(a,cv2.COLOR_BGR2GRAY).astype(np.float32); gb=cv2.cvtColor(b,cv2.COLOR_BGR2GRAY).astype(np.float32)
    ga-=ga.mean(); gb-=gb.mean()
    ncc=float((ga*gb).sum()/(np.sqrt((ga**2).sum()*(gb**2).sum())+1e-6))
    return corr, mse, ncc
cap=cv2.VideoCapture(mp4)
n=int(cap.get(cv2.CAP_PROP_FRAME_COUNT)); fps=cap.get(cv2.CAP_PROP_FPS)
print(f"{tag}: frames={n} fps={fps:.2f} dur={n/max(fps,1):.2f}s")
frames=[]
idxs=[0, n//4, n//2, (3*n)//4, n-1]
for i in idxs:
    cap.set(cv2.CAP_PROP_POS_FRAMES, i); ok,fr=cap.read()
    frames.append(fr if ok else None)
first, mid, last = frames[0], frames[2], frames[-1]
cv2.imwrite(f"{SB}/{tag}-first.jpg", first); cv2.imwrite(f"{SB}/{tag}-mid.jpg", mid); cv2.imwrite(f"{SB}/{tag}-last.jpg", last)
ks=load(f"{FR}/{startk}"); ke=load(f"{FR}/{endk}")
c1=sim(first,ks); c2=sim(last,ke)
print(f"  FIRST vs {startk}: histCorr={c1[0]:.3f} ncc={c1[2]:.3f} mse={c1[1]:.0f}  (want histCorr>0.9, ncc>0.8)")
print(f"  LAST  vs {endk}: histCorr={c2[0]:.3f} ncc={c2[2]:.3f} mse={c2[1]:.0f}")
# glitch scan: consecutive-frame abs-diff across all frames, flag spikes
cap.set(cv2.CAP_PROP_POS_FRAMES,0); prev=None; diffs=[]
step=max(1,n//60)
for i in range(0,n,step):
    cap.set(cv2.CAP_PROP_POS_FRAMES,i); ok,fr=cap.read()
    if not ok: break
    g=cv2.cvtColor(norm(fr),cv2.COLOR_BGR2GRAY).astype(np.float32)
    if prev is not None: diffs.append(float(np.mean(np.abs(g-prev))))
    prev=g
diffs=np.array(diffs)
print(f"  motion diff: mean={diffs.mean():.1f} max={diffs.max():.1f} spike_ratio(max/mean)={diffs.max()/max(diffs.mean(),0.1):.1f}  (spike_ratio>6 = possible cut/glitch)")
cap.release()
