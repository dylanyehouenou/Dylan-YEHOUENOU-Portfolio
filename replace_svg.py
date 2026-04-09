import os
import re

files = ["apropos.html", "evenements.html", "projets.html", "rejoindre.html"]
base = "/Users/yanneilyehouenou/Desktop/Portfolio /naxus-asso/"

for f in files:
    path = os.path.join(base, f)
    if not os.path.exists(path): continue
    with open(path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    nav_pattern = re.compile(r'<svg class="nav-logo-svg"[^>]*>.*?<\/svg>', re.DOTALL)
    nav_repl = '<img src="assets/images/logo_naxus_neon.png" alt="Logo NAXUS" class="nav-logo-svg" style="border-radius: 8px; object-fit: cover;">'
    content = nav_pattern.sub(nav_repl, content)
    
    ftr_pattern = re.compile(r'<svg width="28"[^>]*>.*?<\/svg>', re.DOTALL)
    ftr_repl = '<img src="assets/images/logo_naxus_neon.png" alt="Logo NAXUS footer" width="28" height="28" style="flex-shrink:0; border-radius: 6px; object-fit: cover;">'
    content = ftr_pattern.sub(ftr_repl, content)
    
    with open(path, 'w', encoding='utf-8') as file:
        file.write(content)
print("Replacement complete.")
