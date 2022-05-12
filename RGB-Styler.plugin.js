/**
 * @name RGBStyler
 * @version 1.0.4
 * @description Añade un estilo RGB personalizado.
 * @authorLink https://www.youtube.com/channel/UCtlQSuPjES-qvOpKLbICETA/videos
 * @source https://github.com/TheOnlyLordVirus/Discord-RGB-Styler/blob/main/RGB-Styler.plugin.js
 * @Cristofer https://www.youtube.com/channel/UCtlQSuPjES-qvOpKLbICETA
 */
var Loop = true;
//var Red, Green, Blue;
var savedSettings = null;
var currentSettings = 
[
	{ varName: "--Encabezado primario", defaultCSS: "#fff", rainbowBool: false },
	{ varName: "--Encabezado secundario", defaultCSS: "#b9bbbe", rainbowBool: false },
	{ varName: "--texto normal", defaultCSS: "#dcddde", rainbowBool: false },
	{ varName: "--texto silenciado", defaultCSS: "#72767d", rainbowBool: false },
	{ varName: "--text-link", defaultCSS: "#00b0f4", rainbowBool: false },
	{ varName: "--channels-default", defaultCSS: "#8e9297", rainbowBool: false },
	{ varName: "--interactive-normal", defaultCSS: "#b9bbbe", rainbowBool: false },
	{ varName: "--interactive-hover", defaultCSS: "#dcddde", rainbowBool: false },
	{ varName: "--interactive-active", defaultCSS: "#fff", rainbowBool: false },
	{ varName: "--interactive-muted", defaultCSS: "#4f545c", rainbowBool: false },
	{ varName: "--background-primary", defaultCSS: "#36393f", rainbowBool: false },
	{ varName: "--background-secondary", defaultCSS: "#2f3136", rainbowBool: false },
	{ varName: "--background-tertiary", defaultCSS: "#202225", rainbowBool: false },
	{ varName: "--background-accent", defaultCSS: "#4f545c", rainbowBool: false },
	{ varName: "--background-floating", defaultCSS: "#18191c", rainbowBool: false },
	{ varName: "--background-mobile-header", defaultCSS: "#2f3136", rainbowBool: false },
	{ varName: "--background-modifier-hover", defaultCSS: "rgba(79,84,92,0.16)", rainbowBool: false },
	{ varName: "--background-modifier-active", defaultCSS: "rgba(79,84,92,0.24)", rainbowBool: false },
	{ varName: "--background-modifier-selected", defaultCSS: "rgba(79,84,92,0.32)", rainbowBool: false },
	{ varName: "--background-modifier-accent", defaultCSS: "hsla(0,0%,100%,0.06)", rainbowBool: false },
	/*{ varName: "--elevation-low", defaultCSS: "0 1px 0 rgba(4,4,5,0.2),0 1.5px 0 rgba(6,6,7,0.05),0 2px 0 rgba(4,4,5,0.05)", rainbowBool: false },*/
	/*{ varName: "--elevation-high", defaultCSS: "0 8px 16px rgba(0,0,0,0.24)", rainbowBool: false },*/
	{ varName: "--logo-primary", defaultCSS: "#fff", rainbowBool: false },
	/*{ varName: "--guild-header-text-shadow", defaultCSS: "0 1px 1px rgba(0,0,0,0.4)", rainbowBool: false },*/
	{ varName: "--channeltextarea-background", defaultCSS: "#40444b", rainbowBool: false },
	{ varName: "--activity-card-background", defaultCSS: "#202225", rainbowBool: false },
	{ varName: "--deprecated-panel-background", defaultCSS: "#292b2f", rainbowBool: false },
	{ varName: "--deprecated-card-bg", defaultCSS: "rgba(32,34,37,0.6)", rainbowBool: false },
	{ varName: "--deprecated-card-editable-bg", defaultCSS: "rgba(32,34,37,0.3)", rainbowBool: false },
	{ varName: "--deprecated-store-bg", defaultCSS: "#36393f", rainbowBool: false },
	{ varName: "--deprecated-quickswitcher-input-background", defaultCSS: "#72767d", rainbowBool: false },
	{ varName: "--deprecated-quickswitcher-input-placeholder", defaultCSS: "hsla(0,0%,100%,0.3)", rainbowBool: false },
	{ varName: "--deprecated-text-input-bg", defaultCSS: "rgba(0,0,0,0.1)", rainbowBool: false },
	{ varName: "--deprecated-text-input-border", defaultCSS: "rgba(0,0,0,0.3)", rainbowBool: false },
	{ varName: "--deprecated-text-input-border-hover", defaultCSS: "#040405", rainbowBool: false },
	{ varName: "--deprecated-text-input-border-disabled", defaultCSS: "#202225", rainbowBool: false },
	{ varName: "--deprecated-text-input-prefix", defaultCSS: "#dcddde", rainbowBool: false }
];
class RGBStyler 	
{	
	getName() 
	{
		return "RGB ESTILO";
	}
	
	getDescription() 
	{
		return "Muestre a todos que es un jugador genial con este complemento RGB personalizable para su interfaz de usuario de discord.";
	}
	
	getVersion() 
	{
		return "1.0.9";
	}
	
	getAuthor() 
	{
		return "Avi Gamer";
	}
	
	start() 
	{
		// Obligatory Photosensitive Epilepsy warning. I made this for fun; not to hurt people.
		BdApi.alert("AVERTENCIA:", "Este complemento puede desencadenar convulsiones en personas con epilepsia fotosensible.\nEspecialmente las capas de fondo si tienes todo habilitado a la vez..\nUtilizar con precaución!");
		
		// Check if there's a sound setting saved
		// For some reason BdApi interprets boolean false's as undefined, so we're storing the toggle as a string and converting it.
		savedSettings = BdApi.loadData(this.getName(), "themeDark");

		// Reset settings / create new file.
		if (!savedSettings) 
		{
			console.error("RGB Styler Settings Error: data somehow got corrupted");
			BdApi.saveData(this.getName(), "themeDark", currentSettings); 
		}
		
		// Use saved settings if the file returned data.
		else 
		{
			currentSettings = savedSettings;
			BdApi.saveData(this.getName(), "themeDark", currentSettings);
			console.log("RGB ESTILO: Configuracion Cargando!");
		}

		Loop = true;
		/*
		Red = 255;
		Green = 0;
		Blue = 1;
		*/	
		function myLoop()
		{
			if(Loop)
			{
				/*
				if (Red == 255 && Green == 0 && Blue <= 255 && Blue > 0)
				{
					Blue--;
				}
				else if (Red == 255 && Green >= 0 && Green < 255 && Blue == 0)
				{
					Green++;
				}
				
				else if (Red <= 255 && Red > 0 && Green == 255 && Blue == 0)
				{
					Red--;
				}
				else if (Red == 0 && Green == 255 && Blue >= 0 && Blue < 255)
				{
					Blue++;
				}
				else if (Red == 0 && Green > 0 && Green <= 255 && Blue == 255)
				{
					Green--;
				}
				else
				{
					Red++;
				} 
				*/
				
				let cssString = ".theme-dark { ";
				
				for (var i = 0; i < currentSettings.length; i++)
				{
					cssString += (currentSettings[i].varName + ": " + (currentSettings[i].rainbowBool ? randRGB() : currentSettings[i].defaultCSS) + ";")
				}
				
				cssString += "}";
				
				BdApi.clearCSS("rainbowTheme");   
				BdApi.injectCSS("rainbowTheme", cssString); 
				setTimeout(myLoop, 200); 
			}
			
		}
		
		function randRGB ()
		{
			return "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")";
		}
		
		// Start loop.
		setTimeout(myLoop, 200);
	}
	
	// Create settings panel that allows users to toggle rainbow puke.
	getSettingsPanel() 
	{
		// Create a div to append all of the check box settings to.
		let el = document.createElement("div");
		el.setAttribute("style", "color: white");
		let returnMe = el;
		let header = document.createElement("h2");
		header.setAttribute("id", "title");
		header.innerHTML = "Cambiar La Configuracion";
		returnMe.appendChild(header);
		
		let htmlCheckBoxes = [];
		
		// Create an array of html elements that contains the data from the currentSettings object.
		for(let i = 0, j = 0; i < currentSettings.length; i++, j += 3)
		{
			// Br
			htmlCheckBoxes[j] = document.createElement("br");
			
			// Label
			el = document.createElement("label");
			el.setAttribute("for", "checkbox-" + i);
			el.innerHTML = currentSettings[i].varName;
			htmlCheckBoxes[j + 1] = el;
			
			// Check box.
			el = document.createElement("input");
			el.setAttribute("for", "checkbox-" + i);
			el.setAttribute("type", "checkbox");
			el.checked = currentSettings[i].rainbowBool;
			el.setAttribute("settingIndex", i + "");
			el.addEventListener('change', 
				(event) => 
				{
					let index = event.currentTarget.getAttribute("settingIndex");
					currentSettings[index].rainbowBool = event.currentTarget.checked;
					BdApi.saveData(this.getName(), "themeDark", currentSettings);
				}
			);
			el.setAttribute("content", currentSettings[i].varName);
			el.innerHTML = currentSettings[i].varName;
			htmlCheckBoxes[j + 2] = el;
		}
		
		for(let i = 0; i < htmlCheckBoxes.length; i++)
		{
			returnMe.appendChild(htmlCheckBoxes[i]);
		}
		
		returnMe.appendChild(document.createElement("br"));
		
		return returnMe;	
	}
	
	stop() 
	{
		Loop = false;
		BdApi.clearCSS("rainbowTheme");
	}
}