Set-Location -Path $PSScriptRoot

Push-Location "$PSScriptRoot\Frontend"
npm run build
Pop-Location

Push-Location "$PSScriptRoot\Backend"
npm run dev
Pop-Location

Read-Host "Press Enter to exit"