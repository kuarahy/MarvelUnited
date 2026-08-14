$destDir = "C:\Users\Lucas\Others\Marvel-United-Randomizer\app\public\images\locations"
New-Item -ItemType Directory -Force -Path $destDir | Out-Null

$allFiles = @(
    # Enter the Spider-Verse
    "Location Enter the Spider-Verse 1.jpg", "Location Enter the Spider-Verse 2.jpg", "Location Enter the Spider-Verse 3.jpg",
    "Location Enter the Spider-Verse 4.jpg", "Location Enter the Spider-Verse 5.jpg", "Location Enter the Spider-Verse 6.jpg",
    "Location Enter the Spider-Verse Back.jpg",
    # Tales of Asgard
    "Location Asgard 1.jpg", "Location Asgard 2.jpg", "Location Asgard 3.jpg",
    "Location Asgard 4.jpg", "Location Asgard 5.jpg", "Location Asgard 6.jpg", "Location Asgard Back.jpg",
    # Guardians of the Galaxy Remix
    "Location Guardians 1.jpg", "Location Guardians 2.jpg", "Location Guardians 3.jpg",
    "Location Guardians 4.jpg", "Location Guardians 5.jpg", "Location Guardians 6.jpg", "Location Guardians Back.jpg",
    # Rise of the Black Panther
    "Location Black Panther 1.jpg", "Location Black Panther 2.jpg", "Location Black Panther 3.jpg",
    "Location Black Panther 4.jpg", "Location Black Panther 5.jpg", "Location Black Panther 6.jpg", "Location Black Panther Back.jpg",
    # The Infinity Gauntlet
    "Location Gauntlet 1.jpg", "Location Gauntlet 2.jpg", "Location Gauntlet 3.jpg",
    "Location Gauntlet 4.jpg", "Location Gauntlet 5.jpg", "Location Gauntlet 6.jpg", "Location Gauntlet Back.jpg",
    "Location Gauntlet Thanos 1.jpg", "Location Gauntlet Thanos 2.jpg", "Location Gauntlet Thanos 3.jpg",
    "Location Gauntlet Thanos 4.jpg", "Location Gauntlet Thanos 5.jpg", "Location Gauntlet Thanos 6.jpg", "Location Gauntlet Thanos Back.jpg",
    # Marvel United: X-Men
    "Location X-Men 1.jpg", "Location X-Men 2.jpg", "Location X-Men 3.jpg", "Location X-Men 4.jpg",
    "Location X-Men 5.jpg", "Location X-Men 6.jpg", "Location X-Men 7.jpg", "Location X-Men 8.jpg", "Location X-Men Back.jpg",
    # X-Men Gold Team
    "Location Gold 1.jpg", "Location Gold 2.jpg", "Location Gold 3.jpg", "Location Gold 4.jpg", "Location Gold Back.jpg",
    # X-Men Blue Team
    "Location Blue 1.jpg", "Location Blue 2.jpg", "Location Blue 3.jpg", "Location Blue 4.jpg", "Location Blue Back.jpg",
    # Deadpool
    "Location Deadpool.jpg", "Location Deadpool Back.jpg",
    # The Horsemen of Apocalypse
    "Location Horsemen 1.jpg", "Location Horsemen 2.jpg", "Location Horsemen Back.jpg",
    # First Class
    "Location First Class 1.jpg", "Location First Class 2.jpg", "Location First Class 3.jpg",
    "Location First Class Back.jpg", "Location First Class Danger Room.jpg", "Location First Class Danger Room Back.jpg",
    # X-Force
    "Location X-Force 1.jpg", "Location X-Force 2.jpg", "Location X-Force 3.jpg", "Location X-Force 4.jpg", "Location X-Force Back.jpg",
    # Fantastic Four
    "Location Fantastic Four 1.jpg", "Location Fantastic Four 2.jpg", "Location Fantastic Four 3.jpg",
    "Location Fantastic Four 4.jpg", "Location Fantastic Four Back.jpg",
    # Marvel United: Multiverse
    "Location Multiverse 1.jpg", "Location Multiverse 2.jpg", "Location Multiverse 3.jpg", "Location Multiverse 4.jpg",
    "Location Multiverse 5.jpg", "Location Multiverse 6.jpg", "Location Multiverse 7.jpg", "Location Multiverse 8.jpg", "Location Multiverse Back.jpg",
    # Civil War
    "Civil War Location.jpg", "Civil War Location 1.jpg", "Civil War Location 2.jpg", "Civil War Location 3.jpg",
    "Civil War Location 4.jpg", "Civil War Location 5.jpg", "Civil War Location Back JPG.jpg",
    # World War Hulk
    "World War Hulk Location 1.jpg", "World War Hulk Location 2.jpg", "World War Hulk Location 3.jpg", "World War Hulk Location Back.jpg",
    # Maximum Carnage
    "Location Maximum Carnage 1.jpg", "Location Maximum Carnage 2.jpg", "Location Maximum Carnage 3.jpg",
    "Location Maximum Carnage 4.jpg", "Location Maximum Carnage Back.jpg",
    # The Coming of Galactus
    "Location Coming of Galactus 1.jpg", "Location Coming of Galactus 2.jpg", "Location Coming of Galactus 3.jpg",
    "Location Coming of Galactus 4.jpg", "Location Coming of Galactus 5.jpg", "Location Coming of Galactus 6.jpg", "Location Coming of Galactus Back.jpg",
    # Secret Invasion
    "Location Secret Invasion 1.jpg", "Location Secret Invasion 2.jpg", "Location Secret Invasion 3.jpg",
    "Location Secret Invasion 4.jpg", "Location Secret Invasion Back.jpg",
    # War of Kings
    "Location War of Kings 1.jpg", "Location War of Kings 2.jpg", "Location War of Kings 3.jpg",
    "Location War of Kings 4.jpg", "Location War of Kings Back.jpg",
    # The Age of Apocalypse
    "Location The Age of Apocalypse 1.jpg", "Location The Age of Apocalypse 2.jpg",
    "Location The Age of Apocalypse 3.jpg", "Location The Age of Apocalypse 4.jpg", "Location The Age of Apocalypse Back.jpg",
    # Annihilation
    "Location Annihilation 1.jpg", "Location Annihilation 2.jpg", "Location Annihilation 3.jpg",
    "Location Annihilation 4.jpg", "Location Annihilation Back.jpg",
    # Marvel United: Spider-Geddon
    "Location Spider-Geddon 1.jpg", "Location Spider-Geddon 2.jpg", "Location Spider-Geddon 3.jpg", "Location Spider-Geddon 4.jpg",
    "Location Spider-Geddon 5.jpg", "Location Spider-Geddon 6.jpg", "Location Spider-Geddon 7.jpg", "Location Spider-Geddon 8.jpg", "Location Spider-Geddon Back.jpg",
    # Fin Fang Foom
    "Fin Fang Foom Location.jpg"
)

Write-Host "Total files to download: $($allFiles.Count)" -ForegroundColor Cyan

$headers = @{ "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" }
$batchSize = 50
$urlMap = @{}

# Resolve URLs in batches
for ($i = 0; $i -lt $allFiles.Count; $i += $batchSize) {
    $batch = $allFiles[$i..([Math]::Min($i + $batchSize - 1, $allFiles.Count - 1))]
    $titles = ($batch | ForEach-Object { "File:$_" }) -join "|"
    $apiUrl = "https://cmon-united.fandom.com/api.php?action=query&prop=imageinfo&iiprop=url&format=json&titles=" + [uri]::EscapeDataString($titles)
    $response = Invoke-RestMethod -Uri $apiUrl -Headers $headers -UseBasicParsing
    $response.query.pages | Get-Member -MemberType NoteProperty | ForEach-Object {
        $page = $response.query.pages.($_.Name)
        if ($page.imageinfo -and $page.imageinfo[0].url) {
            $filename = $page.title -replace "^File:", ""
            $urlMap[$filename] = $page.imageinfo[0].url
        }
    }
    Start-Sleep -Milliseconds 200
}

Write-Host "Resolved $($urlMap.Count) URLs" -ForegroundColor Green

# Download each file
$success = 0; $failed = @()
foreach ($filename in $allFiles) {
    $destPath = Join-Path $destDir $filename
    if (Test-Path $destPath) {
        Write-Host "SKIP (exists): $filename" -ForegroundColor Gray
        $success++
        continue
    }
    if ($urlMap.ContainsKey($filename)) {
        $imageUrl = $urlMap[$filename]
        # Strip revision query string for cleaner direct download
        $directUrl = $imageUrl -replace "\?.*$", ""
        try {
            Invoke-WebRequest -Uri $directUrl -OutFile $destPath -Headers $headers -UseBasicParsing | Out-Null
            Write-Host "OK: $filename" -ForegroundColor Green
            $success++
        } catch {
            Write-Host "FAIL: $filename - $_" -ForegroundColor Red
            $failed += $filename
        }
        Start-Sleep -Milliseconds 100
    } else {
        Write-Host "NO URL: $filename" -ForegroundColor Yellow
        $failed += $filename
    }
}

Write-Host "`nDone. Success: $success / $($allFiles.Count)" -ForegroundColor Cyan
if ($failed.Count -gt 0) {
    Write-Host "Failed ($($failed.Count)):" -ForegroundColor Red
    $failed | ForEach-Object { Write-Host "  - $_" -ForegroundColor Red }
}
