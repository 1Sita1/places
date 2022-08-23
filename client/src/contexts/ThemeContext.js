import React from "react"

export const themes = {
    light: {
        name: "light",
        foreground: "light",
        background: "dark",
        mapStyles: null
    },
    dark: {
        name: "dark",
        foreground: "dark",
        background: "light",
        mapStyles: [
            {
                "stylers": [
                    {
                        "hue": "#ff1a00"
                    },
                    {
                        "invert_lightness": true
                    },
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 33
                    },
                    {
                        "gamma": 0.5
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#2D333C"
                    }
                ]
            }
        ]
    }
}

export default React.createContext()