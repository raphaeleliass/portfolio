#!/usr/bin/env bash
set -euo pipefail
# Run against a production preview: bash tests/initial-load.sh http://localhost:3002
url=${1:-http://localhost:3002}
agent() { npx --yes agent-browser --session portfolio-initial-load "$@"; }
trap 'agent close >/dev/null 2>&1 || true' EXIT
agent network route '**/*' --abort --resource-type script
agent open "$url"
agent eval '(() => { const title=document.querySelector(".title-line>span"); if(getComputedStyle(title).animationName!=="portfolio-title")throw Error("Entrance must start before hydration"); if(!document.querySelector(".site-header button").disabled)throw Error("Scripts must be blocked for this check"); return "PASS: CSS entrance without JavaScript"; })()'
agent network unroute
agent reload
agent wait --fn '!document.querySelector(".site-header button").disabled'
agent eval '(() => { const title=document.querySelector(".title-line>span"); if(title.style.transform)throw Error("Hydration reset the title"); if(title.getAnimations().some(a=>!(a instanceof CSSAnimation)))throw Error("Duplicate JavaScript entrance"); return "PASS: no hydration replay"; })()'
agent eval '(async () => { const section=document.querySelector("#contato"); section.scrollIntoView({behavior:"instant",block:"center"}); let animation; for(let i=0;i<60;i++){ await new Promise(requestAnimationFrame); animation=section.getAnimations().find(a=>!(a instanceof CSSAnimation)); if(animation)break; } if(!animation)throw Error("Scroll entrance did not trigger"); const frames=animation.effect.getKeyframes(); if(Number(frames[0].opacity)<0.8)throw Error("Scroll entrance fades too much"); await animation.finished; scrollTo({top:0,behavior:"instant"}); await new Promise(requestAnimationFrame); section.scrollIntoView({behavior:"instant",block:"center"}); for(let i=0;i<4;i++)await new Promise(requestAnimationFrame); if(section.getAnimations().some(a=>a.playState==="running"))throw Error("Scroll entrance replayed"); return "PASS: subtle scroll entrance runs once"; })()'
agent set media light reduced-motion
agent eval '(() => { if(getComputedStyle(document.querySelector(".title-line>span")).animationName!=="none")throw Error("Reduced motion must disable entrance"); return "PASS: reduced motion"; })()'
