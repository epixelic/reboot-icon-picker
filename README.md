# reboot-icon-picker
![home](https://github.com/epixelic/reboot-icon-picker/blob/master/doc/screenshot.png)

## Usage
- To init icon pickers on inputs present in the DOM : `new RebootIconPicker([API_URL], [INPUTS_SELECTOR])`
- If you add new inputs in the DOM, you must refresh them : `RebootIconPicker.refreshIconPickerInputs()`

## API format
```json
{
  "packName": "Font Awesome 4",
  "packVersion": "4.7.0",
  "packLink": "https:/fontawesome.com/v4.7.0\/icons/",
  "icons": [
    {
      "label": "500px",
      "class": "fa-500px",
      "terms": [
        "Brand Icons"
      ],
      "data": {
        "viewBox": [
          "0",
          "0",
          "1792",
          "1792"
        ],
        "path": "M1529 1547l-6 6q-113 113-259 175-154 64-317 64-165 0-317-64-148-63-259-175-113-112-175-258-42-103-54-189-4-28 48-36 51-8 56 20 1 1 1 4 18 90 46 159 50 124 152 226 98 98 226 152 132 56 276 56 143 0 276-56 128-55 225-152l6-6q10-10 25-6 12 3 33 22 36 37 17 58zm-472-615l-66 66 63 63q21 21-7 49-17 17-32 17-10 0-19-10l-62-61-66 66q-5 5-15 5-15 0-31-16l-2-2q-18-15-18-29 0-7 8-17l66-65-66-66q-16-16 14-45 18-18 31-18 6 0 13 5l65 66 65-65q18-17 48 13 27 27 11 44zm471 57q0 118-46 228-45 105-126 186-80 80-187 126t-228 46-228-46-187-126q-82-82-125-186-15-33-15-40h-1q-9-27 43-44 50-16 60 12 37 99 97 167h1v-341q3-136 102-232 105-103 253-103 147 0 251 103t104 249q0 147-104.5 251t-250.5 104q-58 0-112-16-28-11-13-61 16-51 44-43l14 3q14 3 33 6t30 3q104 0 176-71.5t72-174.5q0-101-72-171-71-71-175-71-107 0-178 80-64 72-64 160v413q110 67 242 67 96 0 185-36.5t156-103.5 103.5-155 36.5-183q0-198-141-339-140-140-339-140-200 0-340 140-53 53-77 87l-2 2q-8 11-13 15.5t-21.5 9.5-38.5-3q-21-5-36.5-16.5t-15.5-26.5v-680q0-15 10.5-26.5t27.5-11.5h877q30 0 30 55t-30 55h-811v483h1q40-42 102-84t108-61q109-46 231-46 121 0 228 46t187 126q81 81 126 186 46 112 46 229zm-31-581q9 8 9 18t-5.5 18-16.5 21q-26 26-39 26-9 0-16-7-106-91-207-133-128-56-276-56-133 0-262 49-27 10-45-37-9-25-8-38 3-16 16-20 130-57 299-57 164 0 316 64 137 58 235 152z"
      },
      "packIndex": 0,
      "packSlug": "font-awesome-4",
      "packName": "Font Awesome 4"
    },
    {
      "label": "Address Book Outlined",
      "class": "fa-address-book-o",
      "terms": [
        "Web Application Icons"
      ],
      "data": {
        "viewBox": [
          "0",
          "0",
          "1792",
          "1792"
        ],
        "path": "M1092 644q0 107-76.5 183t-183.5 76-183.5-76-76.5-183q0-108 76.5-184t183.5-76 183.5 76 76.5 184zm-48 220q46 0 82.5 17t60 47.5 39.5 67 24 81 11.5 82.5 3.5 79q0 67-39.5 118.5t-105.5 51.5h-576q-66 0-105.5-51.5t-39.5-118.5q0-48 4.5-93.5t18.5-98.5 36.5-91.5 63-64.5 93.5-26h5q7 4 32 19.5t35.5 21 33 17 37 16 35 9 39.5 4.5 39.5-4.5 35-9 37-16 33-17 35.5-21 32-19.5zm684-256q0 13-9.5 22.5t-22.5 9.5h-96v128h96q13 0 22.5 9.5t9.5 22.5v192q0 13-9.5 22.5t-22.5 9.5h-96v128h96q13 0 22.5 9.5t9.5 22.5v192q0 13-9.5 22.5t-22.5 9.5h-96v224q0 66-47 113t-113 47h-1216q-66 0-113-47t-47-113v-1472q0-66 47-113t113-47h1216q66 0 113 47t47 113v224h96q13 0 22.5 9.5t9.5 22.5v192zm-256 1024v-1472q0-13-9.5-22.5t-22.5-9.5h-1216q-13 0-22.5 9.5t-9.5 22.5v1472q0 13 9.5 22.5t22.5 9.5h1216q13 0 22.5-9.5t9.5-22.5z"
      },
      "packIndex": 0,
      "packSlug": "font-awesome-4",
      "packName": "Font Awesome 4"
    },
    [...]
  ]
}
```
