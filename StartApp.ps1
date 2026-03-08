$ErrorActionPreference = 'Stop'
Set-Location -Path $PSScriptRoot

try {
	Push-Location "$PSScriptRoot\Frontend"
	& npm.cmd install
	& npm.cmd run build
}
finally {
	Pop-Location
}

try {
	Push-Location "$PSScriptRoot\Backend"
	& npm.cmd install
	& npm.cmd run dev
}
finally {
	Pop-Location
}

Read-Host "Press Enter to exit"