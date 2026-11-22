# Generador de portadas estilo blueprint ArquitectoChile
BG="#1E4E86"; INK="#FFFFFF"; THIN="rgba(255,255,255,0.28)"; MID="rgba(255,255,255,0.6)"; ACC="#F97015"; FILL="rgba(255,255,255,0.06)"
def base(body, accent):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<defs><filter id="hand"><feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="4"/><feDisplacementMap in="SourceGraphic" scale="3"/></filter>
<pattern id="g" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M30 0H0V30" fill="none" stroke="{THIN}" stroke-width="1"/></pattern></defs>
<rect width="1200" height="630" fill="{BG}"/><rect width="1200" height="630" fill="url(#g)"/>
<g transform="translate(1080 110)"><circle r="26" fill="none" stroke="{INK}" stroke-width="1.5"/><path d="M0 -34 L9 8 L0 2 L-9 8 Z" fill="{INK}"/></g>
<g filter="url(#hand)">{body}</g>{accent}</svg>'''
def axes(ys,xs):
    return "".join(f'<line x1="120" y1="{y}" x2="1080" y2="{y}" stroke="{MID}" stroke-width="1.2" stroke-dasharray="14 6 2 6"/>' for y in ys)+"".join(f'<line x1="{x}" y1="120" x2="{x}" y2="580" stroke="{MID}" stroke-width="1.2" stroke-dasharray="14 6 2 6"/>' for x in xs)
def ground(x1,x2):
    return f'<line x1="{x1}" y1="520" x2="{x2}" y2="520" stroke="{INK}" stroke-width="7" stroke-linecap="round"/>'+"".join(f'<line x1="{x}" y1="528" x2="{x-14}" y2="544" stroke="{INK}" stroke-width="1.5"/>' for x in range(x1+10,x2,22))
def house(cx):
    l,r=cx-170,cx+170
    s=f'<path d="M{l} 520 V330 L{cx} 200 L{r} 330 V520" fill="{FILL}" stroke="{INK}" stroke-width="4.5" stroke-linejoin="round"/><path d="M{l-25} 350 L{cx} 192 L{r+25} 350" fill="none" stroke="{INK}" stroke-width="2"/><rect x="{cx-35}" y="415" width="70" height="105" fill="none" stroke="{INK}" stroke-width="3"/>'
    for x in (l+45,cx+65): s+=f'<rect x="{x}" y="365" width="60" height="55" fill="none" stroke="{INK}" stroke-width="3"/><line x1="{x+30}" y1="365" x2="{x+30}" y2="420" stroke="{INK}" stroke-width="1.2"/>'
    return s
def dim(x1,x2,y,label):
    s=f'<line x1="{x1}" y1="{y}" x2="{x2}" y2="{y}" stroke="{INK}" stroke-width="1.2"/>'
    for x in (x1,x2): s+=f'<line x1="{x-8}" y1="{y+8}" x2="{x+8}" y2="{y-8}" stroke="{INK}" stroke-width="2.5"/><line x1="{x}" y1="{y-20}" x2="{x}" y2="{y+15}" stroke="{INK}" stroke-width="1"/>'
    return s+f'<text x="{(x1+x2)/2}" y="{y-8}" fill="{INK}" font-family="Inter,Arial" font-size="15" text-anchor="middle" letter-spacing="1">{label}</text>'

def recepcion():
    body=axes((200,330,520),(420,))+ground(160,700)+house(420)+dim(250,590,575,"8.50")
    body+=f'<g transform="rotate(5 860 330)"><rect x="730" y="170" width="260" height="330" fill="{BG}" stroke="{INK}" stroke-width="4"/><rect x="745" y="185" width="230" height="300" fill="none" stroke="{INK}" stroke-width="1"/>'
    body+="".join(f'<line x1="770" y1="{235+i*38}" x2="{770+w}" y2="{235+i*38}" stroke="{MID}" stroke-width="3" stroke-linecap="round"/>' for i,w in enumerate((170,140,160,100)))
    body+=f'<rect x="870" y="425" width="105" height="60" fill="none" stroke="{INK}" stroke-width="1.5"/></g>'
    acc=f'<path d="M598 430 C 640 380, 660 520, 720 545 S 820 560, 870 500" fill="none" stroke="{ACC}" stroke-width="4" stroke-linecap="round" filter="url(#hand)"/>'
    acc+=f'<g filter="url(#hand)"><circle cx="930" cy="455" r="72" fill="{ACC}"/><circle cx="930" cy="455" r="56" fill="none" stroke="{BG}" stroke-width="3" stroke-dasharray="8 7"/><path d="M898 457 L922 481 L965 432" fill="none" stroke="{BG}" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/></g>'
    return base(body,acc)

def obras():
    body=axes((200,330,520),(420,))+ground(160,960)+house(420)+dim(250,590,575,"8.50")
    # ampliación punteada (lo construido sin permiso)
    body+=f'<path d="M590 520 V370 H830 V520" fill="none" stroke="{INK}" stroke-width="3" stroke-dasharray="16 10"/><path d="M575 370 H845" stroke="{INK}" stroke-width="3" stroke-dasharray="16 10"/>'
    body+="".join(f'<line x1="{x}" y1="520" x2="{x+60}" y2="370" stroke="{THIN}" stroke-width="1.5"/>' for x in range(560,800,30))
    body+=dim(590,830,575,"+ 24 m²")
    # nube de revisión naranja (como corrección en plano)
    import math
    cx,cy,rx,ry,n=712,440,165,115,14
    pts=[(cx+rx*math.cos(2*math.pi*i/n),cy+ry*math.sin(2*math.pi*i/n)) for i in range(n+1)]
    d=f"M{pts[0][0]:.0f} {pts[0][1]:.0f} "+" ".join(f"A 30 30 0 0 1 {x:.0f} {y:.0f}" for x,y in pts[1:])
    acc=f'<path d="{d}" fill="none" stroke="{ACC}" stroke-width="4.5" stroke-linejoin="round" filter="url(#hand)"/>'
    acc+=f'<g filter="url(#hand)"><circle cx="930" cy="250" r="58" fill="{ACC}"/><path d="M910 236 C910 205 952 205 952 233 C952 252 930 252 930 272" fill="none" stroke="{BG}" stroke-width="11" stroke-linecap="round"/><circle cx="930" cy="294" r="7" fill="{BG}"/></g>'
    acc+=f'<path d="M875 280 C 850 300, 860 320, 835 335" fill="none" stroke="{ACC}" stroke-width="4" stroke-linecap="round" filter="url(#hand)"/>'
    return base(body,acc)

import sys
for name,fn in (("certificado-de-recepcion-final",recepcion),("obras-que-no-requieren-permiso-de-edificacion",obras)):
    open(f"{name}.svg","w").write(fn())
