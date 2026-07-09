import cv2, numpy as np, sys
mp4=sys.argv[1]; tag=sys.argv[2]
cap=cv2.VideoCapture(mp4); n=int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
GW,GH=8,4; W,H=GW*80,GH*80
idxs=np.linspace(0,n-1,24).astype(int)
frames=[]
for i in idxs:
    cap.set(cv2.CAP_PROP_POS_FRAMES,i); ok,fr=cap.read()
    if ok: frames.append(cv2.cvtColor(cv2.resize(fr,(W,H)),cv2.COLOR_BGR2GRAY))
cap.release()
flowmag=np.zeros((H,W),np.float32); edge=np.zeros((H,W),np.float32)
for a,b in zip(frames[:-1],frames[1:]):
    f=cv2.calcOpticalFlowFarneback(a,b,None,0.5,3,21,3,5,1.2,0)
    flowmag+=np.sqrt(f[...,0]**2+f[...,1]**2)
    edge+=cv2.Laplacian(a,cv2.CV_32F).__abs__()
flowmag/=(len(frames)-1); edge/=(len(frames)-1)
# per cell
print(f"{tag}: flow grid (avg screen-motion per cell)")
gm=flowmag.mean()
frozen=[]
for r in range(GH):
    row=""
    for c in range(GW):
        fm=flowmag[r*80:(r+1)*80,c*80:(c+1)*80].mean()
        ed=edge[r*80:(r+1)*80,c*80:(c+1)*80].mean()
        has_content = ed>edge.mean()*0.6
        ratio=fm/max(gm,0.01)
        ch = "#" if ratio>0.8 else ("o" if ratio>0.35 else ".")
        if ratio<0.35 and has_content: ch="F"; frozen.append((r,c,fm,ed))
        row+=ch
    print("  "+row)
print("  '#'=moving 'o'=some '.'=low-motion(no content) 'F'=FROZEN(content but ~no motion)")
print(f"  FROZEN cells: {len(frozen)}  -> {[(r,c) for r,c,_,_ in frozen]}  (row,col; col0=left)")
