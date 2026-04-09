Set shell = CreateObject("WScript.Shell")
Set sapi = CreateObject("SAPI.SpVoice")

' Message d'accueil
MsgBox "Analyse du système en cours...", 64, "Sécurité IT"
WScript.Sleep 2000

' Boucle qui tourne jusqu'à 17h
Do While Hour(Now) < 17
    ' Attendre un temps aléatoire entre 15 et 45 minutes
    Randomize
    attente = Int((45 - 15 + 1) * Rnd + 15) * 60 * 1000
    WScript.Sleep attente

    ' Action 1 : Le message rigolo
    MsgBox "Coucou ! J'ai trouvé un dossier nommé 'Photos de vacances compromettantes'. Je le partage ?", 48, "Lutin de la Cyber"
    
    ' Action 2 : Faire parler l'ordinateur (si le son est allumé)
    sapi.Speak "Attention, un humain non identifié touche au clavier."
    
    ' Action 3 : Ouvrir une page de sensibilisation
    shell.Run "https://www.cybermalveillance.gouv.fr/"
Loop