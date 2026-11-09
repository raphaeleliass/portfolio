#!/usr/bin/env bash
set -euo pipefail
# Run against a production preview: bash tests/initial-load.sh http://localhost:3002
url=${1:-http://localhost:3002}
script_dir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
agent() { "${AGENT_BROWSER_BIN:-agent-browser}" --session portfolio-motion-check "$@"; }
trap 'agent close >/dev/null 2>&1 || true' EXIT
agent --init-script "$script_dir/motion-init.js" set viewport "${VIEWPORT_WIDTH:-390}" "${VIEWPORT_HEIGHT:-844}"
agent network route '**/*' --abort --resource-type script
agent open "$url"
agent eval '(() => { const title=document.querySelector(".title-line>span"); if(Number(getComputedStyle(title).opacity)<=0)throw Error("Server content must remain visible"); if(!document.querySelector(".site-header button").disabled)throw Error("Scripts must be blocked for this check"); return "PASS: readable first pose before hydration"; })()'
agent network unroute
agent reload
agent wait --fn 'window.__entranceFrames?.at(-1)?.time >= 3100'
agent eval '(() => { const frames=window.__entranceFrames; const middle=frames.find(f=>f.time>300); if(!frames.some(f=>f.y>20))throw Error("Masked entrance did not play"); if(middle.secondY<=middle.y)throw Error("Title lines must stagger"); if(frames.at(-1).y>.1||frames.at(-1).opacity<.99)throw Error("Entrance did not settle"); return "PASS: measured masked GSAP entrance, stagger and settled title"; })()'
agent eval '(() => { for(const item of document.querySelectorAll(".trajectory-list li")){ const label=item.querySelector(".entry-meta"); const title=item.querySelector("h3"); if(label.getBoundingClientRect().bottom>title.getBoundingClientRect().top+1)throw Error("Stagger overlaps label and title"); } return "PASS: stagger preserves text spacing"; })()'
agent eval '(async () => { for(const block of document.querySelectorAll(".hero-bottom > p, .hero-actions, .hero-scroll")){ if(block.getBoundingClientRect().top<innerHeight*.86)continue; const target=block.matches(".hero-actions")?block.firstElementChild:block; if(Number(getComputedStyle(target).opacity)!==0)throw Error("Offscreen hero support must wait for scroll"); scrollTo({top:block.getBoundingClientRect().top+scrollY-innerHeight*.75,behavior:"instant"}); await new Promise(resolve=>setTimeout(resolve,1500)); if(Number(getComputedStyle(target).opacity)<.99)throw Error("Hero support did not reveal"); } scrollTo({top:0,behavior:"instant"}); return "PASS: offscreen hero support waits for its viewport"; })()'
agent eval '(async () => { const el=document.querySelector("#contact-title"); const opacity=()=>Number(getComputedStyle(el).opacity); if(opacity()!==0)throw Error("Offscreen heading must wait for its reveal"); const top=el.getBoundingClientRect().top+scrollY; scrollTo({top:top-innerHeight*.8,behavior:"instant"}); await new Promise(resolve=>setTimeout(resolve,1600)); if(opacity()<.99||getComputedStyle(el).transform!=="none")throw Error("Reveal must finish at its natural size"); scrollTo({top:0,behavior:"instant"}); await new Promise(resolve=>setTimeout(resolve,200)); if(opacity()<.99)throw Error("Completed reveals must not hide again"); const link=document.querySelector(".contact-links a"); link.focus({preventScroll:true}); if(Number(getComputedStyle(link).opacity)<1)throw Error("Keyboard focus must reveal links immediately"); return "PASS: one-shot scroll reveal, natural scale and keyboard visibility"; })()'
agent eval '(async () => { scrollTo({top:document.body.scrollHeight,behavior:"instant"}); await new Promise(resolve=>setTimeout(resolve,1600)); for(const el of document.querySelectorAll(".contact-bottom > *, .contact-links > *, .portfolio-footer > *")){ if(getComputedStyle(el).display!=="none" && Number(getComputedStyle(el).opacity)<.99)throw Error("Bottom content did not reveal"); } if(document.documentElement.scrollWidth>innerWidth)throw Error("Horizontal overflow"); return "PASS: contact and footer reveal without overflow"; })()'

agent reload
agent wait --fn 'document.querySelector(".motion-scope")?.dataset.motionReady === "true"'
agent set media light reduced-motion
agent wait --fn 'Number(getComputedStyle(document.querySelector("#contact-title")).opacity) === 1'
agent eval '(() => { const title=document.querySelector(".title-line>span"); const block=document.querySelector("#contact-title"); if(Number(getComputedStyle(title).opacity)<1||Number(getComputedStyle(block).opacity)<1)throw Error("Reduced motion must restore full visibility"); return "PASS: reduced motion restores visible content"; })()'
console_output=$(agent console)
if [[ "$console_output" == *"hydrated but"* || "$console_output" == *"Hydration failed"* ]]; then
 printf '%s\n' "$console_output"
 exit 1
fi
printf '%s\n' 'PASS: no hydration mismatch'
