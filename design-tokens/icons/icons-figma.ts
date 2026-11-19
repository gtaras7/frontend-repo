/**
 * CardioGuard AI — icon tokens (41 icons).
 *
 * Exported from the 🎨 Icons page in Figma.
 * Same role as design-tokens/tokens.ts: single platform-neutral source, web React and
 * React Native consume the same strings.
 */

export const ICON_NAMES = [
  // Navigation & app
  "home",
  "message-circle",
  "calendar",
  "bell",
  "settings",
  "log-out",
  "search",
  "user",
  "menu",
  "lock",
  "sparkles",
  "refresh-cw",
  // Medical
  "heart-pulse",
  "activity",
  "stethoscope",
  "pill",
  "brain",
  "shield",
  "footprints",
  "scale",
  "shield-check",
  "thermometer",
  "file-text",
  // Status & feedback
  "circle-alert",
  "triangle-alert",
  "check",
  "trending-up",
  "trending-down",
  "clock",
  "info",
  // Actions & UI
  "plus",
  "x",
  "chevron-down",
  "chevron-right",
  "send",
  "phone",
  "users",
  "chevron-left",
  "pencil",
  "download",
  "trash-2",  "partner-logo-white",  "partner-logo-dark",
  "numbers",
  "data",
  "habits",
  "shield-splash",
  "warning",
  "heart-pulse-splash",

] as const;
export type IconName = (typeof ICON_NAMES)[number];
// Figma node ID per icon for re-export and drift checks.
export const ICON_NODE_IDS: Record<IconName, string> = {
  // Navigation & app
  "home": "129:9",
  "message-circle": "129:14",
  "calendar": "129:22",
  "bell": "129:28",
  "settings": "129:34",
  "log-out": "129:41",
  "search": "129:47",
  "user": "129:53",
  "menu": "129:60",
  "lock": "589:97",
  "sparkles": "589:103",
  "refresh-cw": "589:108",
  // Medical
  "heart-pulse": "130:8",
  "activity": "130:13",
  "stethoscope": "130:22",
  "pill": "130:28",
  "brain": "130:40",
  "shield": "130:45",
  "footprints": "130:53",
  "scale": "130:62",
  "shield-check": "589:77",
  "thermometer": "589:83",
  "file-text": "589:88",
  // Status & feedback
  "circle-alert": "130:72",
  "triangle-alert": "130:79",
  "check": "130:84",
  "trending-up": "130:90",
  "trending-down": "130:96",
  "clock": "130:102",
  "info": "130:109",
  // Actions & UI
  "plus": "130:118",
  "x": "130:124",
  "chevron-down": "130:129",
  "chevron-right": "130:134",
  "send": "130:140",
  "phone": "130:145",
  "users": "130:153",
  "chevron-left": "589:116",
  "pencil": "589:121",
  "download": "589:126",
  "trash-2": "589:133",  // Not Figma icon-grid nodes: splash glyphs from the Onboarding Flowboard,
  // partner logo is a user-exported brand SVG.
  "numbers": "408:44",
  "data": "408:52",
  "habits": "408:60",
  "shield-splash": "408:67",
  "warning": "410:138",
  "heart-pulse-splash": "411:148",
  "partner-logo-white": "419:180",
  "partner-logo-dark": "419:180",

};

// Raw SVG markup per icon, exactly as exported from Figma (multi-row, currentColor).
export const ICON_SVGS: Record<IconName, string> = {
  "home": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 21V13C15 12.7348 14.8946 12.4804 14.7071 12.2929C14.5196 12.1054 14.2652 12 14 12H10C9.73478 12 9.48043 12.1054 9.29289 12.2929C9.10536 12.4804 9 12.7348 9 13V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3 10C2.99993 9.70907 3.06333 9.42163 3.18579 9.15772C3.30824 8.89382 3.4868 8.6598 3.709 8.47201L10.709 2.47201C11.07 2.16692 11.5274 1.99953 12 1.99953C12.4726 1.99953 12.93 2.16692 13.291 2.47201L20.291 8.47201C20.5132 8.6598 20.6918 8.89382 20.8142 9.15772C20.9367 9.42163 21.0001 9.70907 21 10V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,

  "message-circle": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.086 17.509C3.17177 17.1193 3.13904 16.7129 2.992 16.342C1.96877 14.219 1.72825 11.8027 2.31289 9.51964C2.89753 7.23654 4.26975 5.23329 6.18744 3.86334C8.10513 2.49338 10.4451 1.84475 12.7944 2.0319C15.1437 2.21904 17.3514 3.22992 19.0281 4.88619C20.7047 6.54247 21.7425 8.73769 21.9583 11.0845C22.1741 13.4314 21.5541 15.7791 20.2077 17.7134C18.8613 19.6477 16.8749 21.0442 14.5991 21.6567C12.3234 22.2692 9.90438 22.0582 7.769 21.061C7.41852 20.9279 7.03771 20.8961 6.67 20.969L3.257 21.967C3.09236 22.0107 2.91929 22.0116 2.7542 21.9697C2.58911 21.9277 2.43747 21.8443 2.31366 21.7273C2.18986 21.6103 2.09799 21.4636 2.04677 21.3011C1.99555 21.1387 1.98668 20.9658 2.021 20.799L3.086 17.509Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,

  "calendar": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 2V5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16 2V5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3 9H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,

  "bell": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.268 21C10.4435 21.304 10.696 21.5565 11 21.732C11.3041 21.9075 11.6489 21.9999 12 21.9999C12.3511 21.9999 12.6959 21.9075 13 21.732C13.304 21.5565 13.5565 21.304 13.732 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.262 15.326C3.13137 15.4692 3.04516 15.6472 3.01386 15.8385C2.98256 16.0298 3.00752 16.226 3.08571 16.4034C3.1639 16.5807 3.29194 16.7316 3.45426 16.8375C3.61658 16.9434 3.80618 16.9999 4 17H20C20.1938 17.0001 20.3834 16.9438 20.5459 16.8381C20.7083 16.7324 20.8365 16.5817 20.9149 16.4045C20.9933 16.2273 21.0185 16.0311 20.9874 15.8398C20.9564 15.6485 20.8704 15.4703 20.74 15.327C19.41 13.956 18 12.499 18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 12.499 4.589 13.956 3.262 15.326Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,

  "settings": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.671 4.136C9.7261 3.55634 9.99533 3.01804 10.4261 2.62628C10.8569 2.23451 11.4182 2.01743 12.0005 2.01743C12.5828 2.01743 13.1441 2.23451 13.5749 2.62628C14.0057 3.01804 14.2749 3.55634 14.33 4.136C14.3631 4.51045 14.486 4.87142 14.6881 5.18834C14.8903 5.50526 15.1659 5.76881 15.4915 5.95668C15.8171 6.14454 16.1831 6.2512 16.5587 6.26762C16.9343 6.28404 17.3082 6.20973 17.649 6.051C18.1781 5.81078 18.7777 5.77602 19.331 5.95348C19.8843 6.13095 20.3518 6.50795 20.6425 7.0111C20.9332 7.51426 21.0263 8.10757 20.9036 8.67557C20.781 9.24357 20.4514 9.74561 19.979 10.084C19.6714 10.2998 19.4203 10.5866 19.2469 10.92C19.0736 11.2534 18.983 11.6237 18.983 11.9995C18.983 12.3753 19.0736 12.7456 19.2469 13.079C19.4203 13.4124 19.6714 13.6992 19.979 13.915C20.4514 14.2534 20.781 14.7554 20.9036 15.3234C21.0263 15.8914 20.9332 16.4847 20.6425 16.9879C20.3518 17.491 19.8843 17.868 19.331 18.0455C18.7777 18.223 18.1781 18.1882 17.649 17.948C17.3082 17.7893 16.9343 17.715 16.5587 17.7314C16.1831 17.7478 15.8171 17.8545 15.4915 18.0423C15.1659 18.2302 14.8903 18.4937 14.6881 18.8107C14.486 19.1276 14.3631 19.4885 14.33 19.863C14.2749 20.4427 14.0057 20.981 13.5749 21.3727C13.1441 21.7645 12.5828 21.9816 12.0005 21.9816C11.4182 21.9816 10.8569 21.7645 10.4261 21.3727C9.99533 20.981 9.7261 20.4427 9.671 19.863C9.63794 19.4884 9.5151 19.1273 9.31286 18.8103C9.11063 18.4932 8.83497 18.2296 8.50923 18.0417C8.18349 17.8538 7.81727 17.7472 7.44158 17.7309C7.06589 17.7146 6.6918 17.7891 6.351 17.948C5.82189 18.1882 5.22233 18.223 4.669 18.0455C4.11567 17.868 3.64817 17.491 3.35748 16.9879C3.06679 16.4847 2.97371 15.8914 3.09636 15.3234C3.219 14.7554 3.5486 14.2534 4.021 13.915C4.32862 13.6992 4.57973 13.4124 4.75309 13.079C4.92645 12.7456 5.01695 12.3753 5.01695 11.9995C5.01695 11.6237 4.92645 11.2534 4.75309 10.92C4.57973 10.5866 4.32862 10.2998 4.021 10.084C3.54926 9.74544 3.22025 9.24359 3.0979 8.67598C2.97555 8.10837 3.06861 7.51554 3.35898 7.01271C3.64936 6.50988 4.11631 6.13298 4.66909 5.95524C5.22187 5.7775 5.82098 5.81163 6.35 6.051C6.69076 6.20973 7.06474 6.28404 7.4403 6.26762C7.81586 6.2512 8.18193 6.14454 8.50754 5.95668C8.83314 5.76881 9.10869 5.50526 9.31086 5.18834C9.51304 4.87142 9.63588 4.51045 9.669 4.136" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,

  "log-out": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 17L21 12L16 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M21 12H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,

  "search": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21 21L16.66 16.66" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,

  "user": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19 21V19C19 17.9391 18.5786 16.9217 17.8284 16.1716C17.0783 15.4214 16.0609 15 15 15H9C7.93913 15 6.92172 15.4214 6.17157 16.1716C5.42143 16.9217 5 17.9391 5 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,

  "menu": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 5H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4 12H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4 19H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,

  "lock": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,

  "sparkles": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 3L10.088 8.813C9.99015 9.11051 9.82379 9.38088 9.60234 9.60234C9.38088 9.82379 9.11051 9.99015 8.813 10.088L3 12L8.813 13.912C9.11051 14.0099 9.38088 14.1762 9.60234 14.3977C9.82379 14.6191 9.99015 14.8895 10.088 15.187L12 21L13.912 15.187C14.0099 14.8895 14.1762 14.6191 14.3977 14.3977C14.6191 14.1762 14.8895 14.0099 15.187 13.912L21 12L15.187 10.088C14.8895 9.99015 14.6191 9.82379 14.3977 9.60234C14.1762 9.38088 14.0099 9.11051 13.912 8.813L12 3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,

  "refresh-cw": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.516 3.00947 16.931 3.99122 18.74 5.74L21 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M21 3V8H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M21 12C21 14.3869 20.0518 16.6761 18.364 18.364C16.6761 20.0518 14.3869 21 12 21C9.48395 20.9905 7.06897 20.0088 5.26 18.26L3 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 16H3V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,

  "heart-pulse": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 9.50001C2.00002 8.38721 2.33759 7.30059 2.96813 6.38367C3.59867 5.46675 4.49252 4.76267 5.53161 4.36441C6.5707 3.96615 7.70616 3.89245 8.78801 4.15305C9.86987 4.41365 10.8472 4.99629 11.591 5.82401C11.6434 5.88002 11.7067 5.92468 11.7771 5.95521C11.8474 5.98574 11.9233 6.00149 12 6.00149C12.0767 6.00149 12.1526 5.98574 12.2229 5.95521C12.2933 5.92468 12.3566 5.88002 12.409 5.82401C13.1504 4.99091 14.128 4.40338 15.2116 4.13961C16.2952 3.87585 17.4335 3.94836 18.4749 4.34749C19.5163 4.74663 20.4114 5.45346 21.0411 6.37391C21.6708 7.29436 22.0053 8.38477 22 9.50001C22 11.79 20.5 13.5 19 15L13.508 20.313C13.3217 20.527 13.0919 20.6989 12.834 20.8173C12.5762 20.9357 12.296 20.9979 12.0123 20.9997C11.7285 21.0015 11.4476 20.9428 11.1883 20.8277C10.9289 20.7126 10.697 20.5436 10.508 20.332L5 15C3.5 13.5 2 11.8 2 9.50001Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.22 13H9.5L10 12L12 16.5L14 9.5L15.5 13H20.77" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,

  "activity": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22 12H19.52C19.083 11.9991 18.6577 12.1413 18.3091 12.405C17.9606 12.6686 17.708 13.0392 17.59 13.46L15.24 21.82C15.2249 21.8719 15.1933 21.9175 15.15 21.95C15.1067 21.9825 15.0541 22 15 22C14.9459 22 14.8933 21.9825 14.85 21.95C14.8067 21.9175 14.7751 21.8719 14.76 21.82L9.24 2.18C9.22485 2.12807 9.19327 2.08246 9.15 2.05C9.10673 2.01754 9.05409 2 9 2C8.94591 2 8.89327 2.01754 8.85 2.05C8.80673 2.08246 8.77515 2.12807 8.76 2.18L6.41 10.54C6.29246 10.9592 6.04138 11.3285 5.69486 11.592C5.34835 11.8555 4.92532 11.9988 4.49 12H2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,

  "stethoscope": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 2V4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5 2V4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5 3H4C3.46957 3 2.96086 3.21071 2.58579 3.58579C2.21071 3.96086 2 4.46957 2 5V9C2 10.5913 2.63214 12.1174 3.75736 13.2426C4.88258 14.3679 6.4087 15 8 15C9.5913 15 11.1174 14.3679 12.2426 13.2426C13.3679 12.1174 14 10.5913 14 9V5C14 4.46957 13.7893 3.96086 13.4142 3.58579C13.0391 3.21071 12.5304 3 12 3H11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 15C8 16.5913 8.63214 18.1174 9.75736 19.2426C10.8826 20.3679 12.4087 21 14 21C15.5913 21 17.1174 20.3679 18.2426 19.2426C19.3679 18.1174 20 16.5913 20 15V12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20 12C21.1046 12 22 11.1046 22 10C22 8.89543 21.1046 8 20 8C18.8954 8 18 8.89543 18 10C18 11.1046 18.8954 12 20 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,

  "pill": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.5 20.5L20.5 10.5C20.9673 10.0421 21.3391 9.49606 21.5941 8.89352C21.849 8.29099 21.982 7.64389 21.9853 6.98965C21.9886 6.33541 21.8622 5.687 21.6133 5.08192C21.3645 4.47684 20.9982 3.92709 20.5355 3.46447C20.0729 3.00184 19.5232 2.63552 18.9181 2.38668C18.313 2.13783 17.6646 2.01141 17.0104 2.01471C16.3561 2.01802 15.709 2.15098 15.1065 2.40593C14.5039 2.66087 13.9579 3.03273 13.5 3.5L3.5 13.5C3.03273 13.9579 2.66087 14.5039 2.40593 15.1065C2.15098 15.709 2.01802 16.3561 2.01471 17.0104C2.01141 17.6646 2.13783 18.313 2.38668 18.9181C2.63552 19.5232 3.00184 20.0729 3.46447 20.5355C3.92709 20.9982 4.47684 21.3645 5.08192 21.6133C5.687 21.8622 6.33541 21.9886 6.98965 21.9853C7.64389 21.982 8.29099 21.849 8.89352 21.5941C9.49606 21.3391 10.0421 20.9673 10.5 20.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.5 8.5L15.5 15.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,

  "brain": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 18V5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15 13C14.1348 12.7471 13.3748 12.2206 12.834 11.4995C12.2932 10.7784 12.0005 9.90141 12 9C11.9995 9.90141 11.7068 10.7784 11.166 11.4995C10.6252 12.2206 9.8652 12.7471 9 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.598 6.50001C17.8281 6.1015 17.9635 5.65539 17.9936 5.1962C18.0237 4.73702 17.9478 4.27705 17.7717 3.8519C17.5956 3.42675 17.324 3.04781 16.9781 2.74439C16.6321 2.44097 16.221 2.22121 15.7765 2.1021C15.332 1.983 14.866 1.96775 14.4147 2.05753C13.9634 2.14731 13.5387 2.33971 13.1737 2.61986C12.8086 2.9 12.5129 3.26037 12.3093 3.6731C12.1058 4.08582 12 4.53984 12 5.00001C12 4.53984 11.8942 4.08582 11.6907 3.6731C11.4871 3.26037 11.1914 2.9 10.8263 2.61986C10.4613 2.33971 10.0366 2.14731 9.5853 2.05753C9.13396 1.96775 8.66803 1.983 8.22353 2.1021C7.77904 2.22121 7.3679 2.44097 7.02193 2.74439C6.67596 3.04781 6.40442 3.42675 6.22833 3.8519C6.05224 4.27705 5.97632 4.73702 6.00643 5.1962C6.03655 5.65539 6.17189 6.1015 6.402 6.50001" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.997 5.125C18.5848 5.27614 19.1305 5.55905 19.5928 5.95231C20.0551 6.34557 20.4218 6.83887 20.6652 7.39485C20.9086 7.95082 21.0223 8.55489 20.9976 9.16131C20.973 9.76773 20.8107 10.3606 20.523 10.895" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18 18C18.8805 18 19.7364 17.7094 20.4349 17.1734C21.1335 16.6373 21.6356 15.8858 21.8635 15.0353C22.0914 14.1848 22.0323 13.2829 21.6954 12.4694C21.3585 11.6559 20.7625 10.9763 20 10.536" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19.967 17.483C20.0371 18.0252 19.9953 18.5761 19.8441 19.1015C19.693 19.627 19.4357 20.1158 19.0882 20.538C18.7407 20.9601 18.3104 21.3065 17.8238 21.5558C17.3372 21.8051 16.8046 21.9519 16.259 21.9873C15.7134 22.0227 15.1664 21.9459 14.6516 21.7616C14.1369 21.5773 13.6654 21.2894 13.2662 20.9158C12.8671 20.5421 12.5488 20.0906 12.331 19.5891C12.1132 19.0876 12.0006 18.5467 12 18C11.9994 18.5467 11.8867 19.0876 11.669 19.5891C11.4512 20.0906 11.1329 20.5421 10.7338 20.9158C10.3346 21.2894 9.86313 21.5773 9.34838 21.7616C8.83364 21.9459 8.28657 22.0227 7.74097 21.9873C7.19537 21.9519 6.66283 21.8051 6.17622 21.5558C5.68961 21.3065 5.25927 20.9601 4.91178 20.538C4.56429 20.1158 4.30703 19.627 4.15589 19.1015C4.00474 18.5761 3.96291 18.0252 4.033 17.483" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.00001 18C5.1195 18 4.26361 17.7094 3.56507 17.1734C2.86653 16.6373 2.36438 15.8858 2.13648 15.0353C1.90859 14.1848 1.96769 13.2829 2.30462 12.4694C2.64156 11.6559 3.23749 10.9763 4.00001 10.536" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.00299 5.125C5.41519 5.27614 4.86949 5.55905 4.40722 5.95231C3.94495 6.34557 3.57823 6.83887 3.33483 7.39485C3.09144 7.95082 2.97775 8.55489 3.00238 9.16131C3.02701 9.76773 3.18931 10.3606 3.47699 10.895" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,

  "shield": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 13C20 18 16.5 20.5 12.34 21.95C12.1222 22.0238 11.8855 22.0203 11.67 21.94C7.5 20.5 4 18 4 13V5.99999C4 5.73478 4.10536 5.48042 4.29289 5.29289C4.48043 5.10535 4.73478 4.99999 5 4.99999C7 4.99999 9.5 3.79999 11.24 2.27999C11.4519 2.09899 11.7214 1.99954 12 1.99954C12.2786 1.99954 12.5481 2.09899 12.76 2.27999C14.51 3.80999 17 4.99999 19 4.99999C19.2652 4.99999 19.5196 5.10535 19.7071 5.29289C19.8946 5.48042 20 5.73478 20 5.99999V13Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,

  "footprints": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.99997 16V13.62C3.99997 11.5 2.96997 10.5 2.99997 8C3.02997 5.28 4.48997 2 7.49997 2C9.36997 2 9.99997 3.8 9.99997 5.5C9.99997 8.61 7.99997 11.16 7.99997 14.18V16C7.99997 16.5304 7.78926 17.0391 7.41419 17.4142C7.03911 17.7893 6.5304 18 5.99997 18C5.46954 18 4.96083 17.7893 4.58576 17.4142C4.21069 17.0391 3.99997 16.5304 3.99997 16Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20 20V17.62C20 15.5 21.03 14.5 21 12C20.97 9.28 19.51 6 16.5 6C14.63 6 14 7.8 14 9.5C14 12.61 16 15.16 16 18.18V20C16 20.5304 16.2107 21.0391 16.5858 21.4142C16.9609 21.7893 17.4696 22 18 22C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16 17H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4 13H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,

  "scale": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 3V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19 8L22 16C21.1345 16.6491 20.0819 17 19 17C17.9181 17 16.8655 16.6491 16 16L19 8ZM19 8V7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3 7H4C6.79039 7 9.53789 6.31313 12 5C14.4621 6.31313 17.2096 7 20 7H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5 8L8 16C7.13452 16.6491 6.08185 17 5 17C3.91815 17 2.86548 16.6491 2 16L5 8ZM5 8V7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7 21H17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,

  "shield-check": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,

  "thermometer": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14 4V14.54C14.7626 14.9803 15.3586 15.6599 15.6955 16.4734C16.0325 17.2869 16.0916 18.1888 15.8637 19.0394C15.6358 19.8899 15.1336 20.6415 14.435 21.1775C13.7365 21.7136 12.8805 22.0041 12 22.0041C11.1195 22.0041 10.2635 21.7136 9.56496 21.1775C8.86638 20.6415 8.3642 19.8899 8.1363 19.0394C7.9084 18.1888 7.96752 17.2869 8.30448 16.4734C8.64145 15.6599 9.23743 14.9803 10 14.54V4C10 3.46957 10.2107 2.96086 10.5858 2.58579C10.9609 2.21071 11.4696 2 12 2C12.5304 2 13.0391 2.21071 13.4142 2.58579C13.7893 2.96086 14 3.46957 14 4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,

  "file-text": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V7L15 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14 2V6C14 6.53043 14.2107 7.03914 14.5858 7.41421C14.9609 7.78929 15.4696 8 16 8H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 9H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16 13H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16 17H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,

  "circle-alert": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 8V12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 16H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,

  "triangle-alert": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.73 18L13.73 3.99998C13.5556 3.69218 13.3026 3.43617 12.9969 3.25805C12.6913 3.07993 12.3438 2.98608 11.99 2.98608C11.6362 2.98608 11.2888 3.07993 10.9831 3.25805C10.6774 3.43617 10.4244 3.69218 10.25 3.99998L2.25001 18C2.07369 18.3053 1.98123 18.6519 1.98201 19.0045C1.9828 19.3571 2.07678 19.7032 2.25445 20.0078C2.43212 20.3124 2.68715 20.5646 2.9937 20.7388C3.30025 20.9131 3.64741 21.0032 4.00001 21H20C20.3509 20.9996 20.6955 20.9069 20.9993 20.7313C21.303 20.5556 21.5552 20.3031 21.7305 19.9991C21.9058 19.6951 21.998 19.3504 21.998 18.9995C21.9979 18.6486 21.9055 18.3039 21.73 18Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 9V13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 17H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,

  "check": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,

  "trending-up": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 7H22V13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M22 7L13.5 15.5L8.5 10.5L2 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,

  "trending-down": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 17H22V11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M22 17L13.5 8.5L8.5 13.5L2 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,

  "clock": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 6V12L16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,

  "info": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 16V12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 8H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,

  "plus": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 5V19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,

  "x": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,

  "chevron-down": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,

  "chevron-right": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,

  "send": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.536 21.686C14.574 21.7807 14.64 21.8615 14.7253 21.9175C14.8105 21.9736 14.9108 22.0022 15.0128 21.9996C15.1148 21.997 15.2136 21.9633 15.2958 21.9029C15.3781 21.8426 15.4399 21.7585 15.473 21.662L21.973 2.662C22.005 2.57339 22.0111 2.4775 21.9906 2.38555C21.9701 2.2936 21.9238 2.20939 21.8572 2.14277C21.7906 2.07616 21.7064 2.02989 21.6144 2.00939C21.5225 1.98888 21.4266 1.99499 21.338 2.027L2.33799 8.527C2.24148 8.56009 2.15741 8.62191 2.09706 8.70417C2.03671 8.78642 2.00296 8.88517 2.00035 8.98715C1.99773 9.08914 2.02638 9.18949 2.08245 9.27472C2.13851 9.35996 2.21931 9.426 2.31399 9.46399L10.244 12.644C10.4947 12.7444 10.7224 12.8945 10.9136 13.0852C11.1047 13.276 11.2552 13.5035 11.356 13.754L14.536 21.686Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M21.854 2.14697L10.914 13.086" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,

  "phone": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.832 16.568C14.0385 16.6628 14.2712 16.6845 14.4917 16.6294C14.7122 16.5744 14.9073 16.4458 15.045 16.265L15.4 15.8C15.5863 15.5516 15.8279 15.35 16.1056 15.2111C16.3833 15.0723 16.6895 15 17 15H20C20.5304 15 21.0391 15.2107 21.4142 15.5858C21.7893 15.9609 22 16.4696 22 17V20C22 20.5304 21.7893 21.0391 21.4142 21.4142C21.0391 21.7893 20.5304 22 20 22C15.2261 22 10.6477 20.1036 7.27208 16.7279C3.89642 13.3523 2 8.7739 2 4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H7C7.53043 2 8.03914 2.21071 8.41421 2.58579C8.78929 2.96086 9 3.46957 9 4V7C9 7.31049 8.92771 7.61672 8.78885 7.89443C8.65 8.17214 8.44839 8.41371 8.2 8.6L7.732 8.951C7.54842 9.09118 7.41902 9.29059 7.36579 9.51535C7.31256 9.74012 7.33878 9.97638 7.44 10.184C8.80668 12.9599 11.0544 15.2048 13.832 16.568Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,

  "users": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H6C4.93913 15 3.92172 15.4214 3.17157 16.1716C2.42143 16.9217 2 17.9391 2 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16 3.12799C16.8578 3.35036 17.6174 3.85125 18.1597 4.55205C18.702 5.25285 18.9962 6.11388 18.9962 6.99999C18.9962 7.8861 18.702 8.74713 18.1597 9.44793C17.6174 10.1487 16.8578 10.6496 16 10.872" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M22 21V19C21.9993 18.1137 21.7044 17.2528 21.1614 16.5523C20.6184 15.8519 19.8581 15.3516 19 15.13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,

  "chevron-left": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,

  "pencil": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.174 6.81201C21.7027 6.28344 21.9998 5.56648 21.9999 4.81887C22 4.07125 21.7031 3.35422 21.1745 2.82551C20.6459 2.29681 19.929 1.99973 19.1814 1.99963C18.4337 1.99954 17.7167 2.29644 17.188 2.82501L3.842 16.174C3.60982 16.4055 3.43812 16.6905 3.342 17.004L2.021 21.356C1.99516 21.4425 1.99321 21.5344 2.01535 21.6219C2.0375 21.7094 2.08292 21.7892 2.1468 21.853C2.21068 21.9168 2.29062 21.9621 2.37816 21.9841C2.4657 22.0061 2.55756 22.004 2.644 21.978L6.997 20.658C7.31017 20.5628 7.59518 20.3921 7.827 20.161L21.174 6.81201Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,

  "download": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,

  "trash-2": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 6H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19 6V20C19 21 18 22 17 22H7C6 22 5 21 5 20V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 6V4C8 3 9 2 10 2H14C15 2 16 3 16 4V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 11V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14 11V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,

  // Splash glyph (splash screen, Figma 408:xx series) — NOT in the Figma icon grid.
  "numbers": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 9.49998C2.00002 8.38718 2.33759 7.30056 2.96813 6.38364C3.59867 5.46672 4.49252 4.76264 5.53161 4.36438C6.5707 3.96612 7.70616 3.89242 8.78801 4.15302C9.86987 4.41362 10.8472 4.99626 11.591 5.82398C11.6434 5.87999 11.7067 5.92465 11.7771 5.95518C11.8474 5.98571 11.9233 6.00146 12 6.00146C12.0767 6.00146 12.1526 5.98571 12.2229 5.95518C12.2933 5.92465 12.3566 5.87999 12.409 5.82398C13.1504 4.99088 14.128 4.40335 15.2116 4.13958C16.2952 3.87581 17.4335 3.94833 18.4749 4.34746C19.5163 4.7466 20.4114 5.45343 21.0411 6.37388C21.6708 7.29433 22.0053 8.38474 22 9.49998C22 11.79 20.5 13.5 19 15L13.508 20.313C13.3217 20.527 13.0919 20.6989 12.834 20.8173C12.5762 20.9357 12.296 20.9978 12.0123 20.9996C11.7285 21.0014 11.4476 20.9428 11.1883 20.8277C10.9289 20.7126 10.697 20.5436 10.508 20.332L5 15C3.5 13.5 2 11.8 2 9.49998Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.21997 13H9.49997L9.99997 12L12 16.5L14 9.5L15.5 13H20.77" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,


  // Splash glyph (splash screen, Figma 408:xx series) — NOT in the Figma icon grid.
  "data": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3 11H21V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,


  // Splash glyph (splash screen, Figma 408:xx series) — NOT in the Figma icon grid.
  "habits": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 12H19.52C19.083 11.9991 18.6577 12.1413 18.3091 12.405C17.9606 12.6686 17.708 13.0392 17.59 13.46L15.24 21.82C15.2249 21.8719 15.1933 21.9175 15.15 21.95C15.1067 21.9825 15.0541 22 15 22C14.9459 22 14.8933 21.9825 14.85 21.95C14.8067 21.9825 14.7751 21.8719 14.76 21.82L9.24 2.18C9.22485 2.12807 9.19327 2.08246 9.15 2.05C9.10673 1.01754 9.05409 1 9 1C8.94591 1 8.89327 1.01754 8.85 1.05C8.80673 1.08246 8.77515 1.12807 8.76 1.18L6.41 10.54C6.29246 10.9592 6.04138 11.3285 5.69486 11.592C5.34835 11.8555 4.92532 11.9988 4.49 12H2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,


  // Splash glyph (splash screen, Figma 408:xx series) — NOT in the Figma icon grid.
  "shield-splash": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 13C20 18 16.5 20.5 12.34 21.95C12.1222 22.0238 11.8855 22.0203 11.67 21.94C7.5 20.5 4 18 4 13V6.00002C4 5.73481 4.10536 5.48045 4.29289 5.29292C4.48043 5.10538 4.73478 5.00002 5 5.00002C7 5.00002 9.5 3.80002 11.24 2.28002C11.4519 2.09902 11.7214 1.99957 12 1.99957C12.2786 1.99957 12.5481 2.09902 12.76 2.28002C14.51 3.81002 17 5.00002 19 5.00002C19.2652 5.00002 19.5196 5.10538 19.7071 5.29292C19.8946 5.48045 20 5.73481 20 6.00002V13Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,


  // Splash glyph (splash screen, Figma 410:xx series) — NOT in the Figma icon grid.
  "warning": `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M28.9732 24L18.3066 5.33334C18.074 4.92294 17.7367 4.58159 17.3291 4.3441C16.9216 4.1066 16.4583 3.98148 15.9866 3.98148C15.5149 3.98148 15.0516 4.1066 14.644 4.3441C14.2364 4.58159 13.8992 4.92294 13.6666 5.33334L2.99991 24C2.76482 24.4072 2.64154 24.8692 2.64258 25.3394C2.64363 25.8095 2.76894 26.271 3.00583 26.6771C3.24273 27.0832 3.58277 27.4195 3.9915 27.6518C4.40023 27.8841 4.86312 28.0042 5.33324 28H26.6666C27.1344 27.9995 27.5939 27.876 27.9989 27.6417C28.404 27.4075 28.7402 27.0708 28.9739 26.6655C29.2076 26.2602 29.3306 25.8005 29.3305 25.3327C29.3304 24.8648 29.2072 24.4052 28.9732 24Z" stroke="currentColor" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16 12V17.3333" stroke="currentColor" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16 22.6667H16.0133" stroke="currentColor" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

  // Welcome screen glyph (step 02, Figma 411:148, part of the welcome icon bubble
  // 411:147) — heart with pulse line at 32px, NOT in the Figma icon grid.
  "heart-pulse-splash": `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.66675 12.6667C2.66678 11.1829 3.11687 9.73411 3.95759 8.51155C4.79831 7.289 5.9901 6.35021 7.37556 5.8192C8.76102 5.28819 10.275 5.18993 11.7174 5.53739C13.1599 5.88486 14.463 6.66171 15.4547 7.76534C15.5246 7.84002 15.609 7.89956 15.7028 7.94027C15.7967 7.98098 15.8978 8.00198 16.0001 8.00198C16.1023 8.00198 16.2035 7.98098 16.2973 7.94027C16.3911 7.89956 16.4756 7.84002 16.5454 7.76534C17.534 6.65454 18.8374 5.87116 20.2823 5.51947C21.7271 5.16778 23.2447 5.26446 24.6332 5.79665C26.0218 6.32883 27.2153 7.27127 28.0549 8.49854C28.8945 9.7258 29.3405 11.1797 29.3334 12.6667C29.3334 15.72 27.3334 18 25.3334 20L18.0107 27.084C17.7623 27.3693 17.456 27.5986 17.1121 27.7564C16.7683 27.9143 16.3948 27.9971 16.0165 27.9995C15.6381 28.0019 15.2636 27.9238 14.9178 27.7703C14.572 27.6168 14.2628 27.3915 14.0107 27.1093L6.66675 20C4.66675 18 2.66675 15.7333 2.66675 12.6667Z" stroke="currentColor" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.29321 17.3333H12.6665L13.3332 16L15.9999 22L18.6665 12.6667L20.6665 17.3333H27.6932" stroke="currentColor" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/></svg>`,


  // Partner logo — Agios Loukas hospital.
  "partner-logo-white": `<svg xmlns="http://www.w3.org/2000/svg" width="1485" height="508" viewBox="78 84 1485 508"><path xmlns="http://www.w3.org/2000/svg" d="M 849 210.500 L 849 239 856.500 239 L 864 239 864 230.965 C 864 225.252, 864.467 222.217, 865.615 220.465 C 868.154 216.590, 867.281 215.713, 878.347 233.250 L 881.975 239 890.988 239 C 895.944 239, 900 238.723, 900 238.384 C 900 238.045, 898.470 235.683, 896.600 233.134 C 894.730 230.585, 890.055 223.726, 886.210 217.892 L 879.220 207.283 882.894 202.892 C 884.915 200.476, 889.629 194.787, 893.370 190.250 L 900.173 182 890.765 182 L 881.358 182 873.325 192.980 C 868.908 199.019, 865.002 203.669, 864.647 203.313 C 864.291 202.958, 864 198.017, 864 192.333 L 864 182 856.500 182 L 849 182 849 210.500 Z M 919.517 183.250 C 917.506 189.228, 903 237.396, 903 238.094 C 903 238.592, 906.521 239, 910.824 239 L 918.648 239 923.543 218.576 C 926.235 207.343, 928.712 198.322, 929.048 198.530 C 929.384 198.737, 930.245 201.515, 930.962 204.703 C 933.126 214.320, 939.055 237.280, 939.604 238.169 C 939.887 238.626, 943.740 239, 948.166 239 C 955.421 239, 956.148 238.828, 955.540 237.250 C 954.766 235.239, 944.363 201.302, 940.979 189.750 L 938.709 182 929.323 182 C 922.705 182, 919.813 182.369, 919.517 183.250 Z M 964 210.500 L 964 239 972 239 L 980 239 980 210.500 L 980 182 972 182 L 964 182 964 210.500 Z M 992 210.460 L 992 239 999.500 239 L 1007 239 1007 222.803 L 1007 206.606 1016.811 222.553 L 1026.623 238.500 1034.311 238.792 L 1042 239.084 1042 210.542 L 1042 182 1034.431 182 L 1026.862 182 1027.181 198.001 C 1027.357 206.802, 1027.275 213.984, 1027 213.961 C 1026.725 213.938, 1022.394 206.850, 1017.376 198.210 L 1008.251 182.500 1000.126 182.210 L 992 181.919 992 210.460 Z M 1054 210.500 L 1054 239 1062 239 L 1070 239 1070 210.500 L 1070 182 1062 182 L 1054 182 1054 210.500 Z M 1081 210.542 L 1081 239.084 1088.750 238.792 L 1096.500 238.500 1097.053 230 C 1097.597 221.630, 1098.480 218, 1099.973 218 C 1100.390 218, 1103.830 222.717, 1107.616 228.482 L 1114.500 238.965 1123.357 238.982 C 1130.534 238.997, 1132.112 238.735, 1131.678 237.603 C 1131.383 236.834, 1126.835 229.906, 1121.571 222.206 C 1116.307 214.507, 1112 207.922, 1112 207.573 C 1112 207.055, 1125.118 190.450, 1130.821 183.750 C 1132.224 182.101, 1131.765 182.003, 1122.905 182.047 L 1113.500 182.094 1105.500 193.297 L 1097.500 204.500 1097.217 193.250 L 1096.934 182 1088.967 182 L 1081 182 1081 210.542 Z M 1138.234 210.250 L 1138.500 238.500 1146.250 238.792 L 1154 239.084 1154 227.542 L 1154 216 1163.467 216 L 1172.934 216 1173.217 227.250 L 1173.500 238.500 1181.250 238.792 L 1189 239.084 1189 210.542 L 1189 182 1181 182 L 1173 182 1173 192.500 L 1173 203 1163.500 203 L 1154 203 1154 192.500 L 1154 182 1145.984 182 L 1137.969 182 1138.234 210.250 Z M 153.996 203.064 C 129.689 205.649, 95.354 216.156, 82.647 224.899 C 80.068 226.673, 78.181 228.483, 78.452 228.922 C 78.723 229.360, 82.395 230.032, 86.613 230.414 C 91.529 230.859, 95.936 231.949, 98.891 233.450 C 106.423 237.275, 124.218 253.308, 145.087 275.072 C 155.861 286.308, 166.211 297.076, 168.087 299.002 C 172.094 303.112, 201.260 333.753, 226.054 359.897 C 235.649 370.016, 250.593 385.991, 259.262 395.397 C 279.517 417.376, 286.912 423.735, 299.500 430.003 C 322.545 441.478, 351.789 443.829, 386 436.958 C 410.310 432.075, 441 418.956, 441 413.446 C 441 411.736, 438.642 411.186, 429.500 410.762 C 410.525 409.882, 389.825 390.908, 292.846 285.500 C 264.509 254.700, 238.428 226.800, 234.890 223.500 C 223.120 212.523, 208.795 205.519, 193.153 203.092 C 185.264 201.868, 165.378 201.854, 153.996 203.064 Z M 502 203.050 C 474.375 206.445, 442.360 216.563, 430.108 225.770 C 426.921 228.164, 426.827 228.400, 428.549 229.659 C 429.645 230.461, 433.047 231, 437.010 231 C 442.908 231, 444.315 231.413, 449.791 234.750 C 462.020 242.202, 474.882 254.513, 518.490 300.500 C 540.263 323.461, 545.824 329.314, 574.558 359.501 C 586.076 371.601, 602.670 389.280, 611.433 398.786 C 629.514 418.400, 635.810 423.916, 646.780 429.758 C 673.135 443.791, 715.003 444.419, 755.500 431.389 C 767.551 427.511, 782.810 420.486, 787.471 416.669 C 792.077 412.897, 789.788 411, 780.628 411 C 771.477 411.001, 764.974 407.813, 750.147 396.059 C 731.161 381.007, 675.549 324.081, 626.500 269.491 C 601.418 241.574, 580.987 220.819, 573.637 215.786 C 566.275 210.745, 556.819 206.429, 548.742 204.422 C 541.192 202.546, 512.867 201.714, 502 203.050 Z M 1175.675 271.559 C 1143.738 278.731, 1125.608 304.353, 1127.286 339.942 C 1128.169 358.646, 1132.536 370.610, 1142.549 381.755 C 1153.944 394.438, 1170.332 401.161, 1190 401.220 C 1228.129 401.334, 1252.919 378.030, 1255.625 339.529 C 1257.828 308.195, 1241.589 282.076, 1214.500 273.385 C 1204.191 270.078, 1186.067 269.225, 1175.675 271.559 Z M 875.711 276.250 C 867.758 299.129, 843.524 369.081, 838.988 382.250 L 833.219 399 851.385 399 L 869.552 399 874.354 384.478 L 879.156 369.955 897.285 370.228 L 915.415 370.500 919.518 384.500 L 923.621 398.500 942.885 398.772 L 962.149 399.044 961.412 396.772 C 961.006 395.522, 957.560 384.600, 953.752 372.500 C 949.945 360.400, 944.466 343.075, 941.576 334 C 938.687 324.925, 933.284 307.825, 929.571 296 C 925.857 284.175, 922.355 273.938, 921.787 273.250 C 921.019 272.320, 915.181 272, 898.972 272 L 877.188 272 875.711 276.250 Z M 973.677 272.656 C 973.305 273.029, 973 301.608, 973 336.167 L 973 399 991.500 399 L 1010 399 1010 350 L 1010 301 1035.027 301 L 1060.055 301 1059.777 286.750 L 1059.500 272.500 1016.927 272.239 C 993.512 272.096, 974.050 272.284, 973.677 272.656 Z M 1075.689 272.644 C 1075.310 273.023, 1075 301.608, 1075 336.167 L 1075 399 1093.007 399 L 1111.015 399 1110.757 335.750 L 1110.500 272.500 1093.439 272.227 C 1084.056 272.077, 1076.069 272.265, 1075.689 272.644 Z M 1265.322 273.604 C 1264.983 274.486, 1264.988 280.138, 1265.333 286.165 L 1265.960 297.122 1273.539 305.811 C 1277.708 310.590, 1283.377 317.091, 1286.137 320.258 C 1288.897 323.425, 1292.848 328.158, 1294.917 330.776 L 1298.679 335.536 1293.590 341.721 C 1290.790 345.122, 1283.213 354.261, 1276.750 362.029 L 1265 376.152 1265.011 383.826 C 1265.017 388.047, 1265.301 393.188, 1265.642 395.250 L 1266.262 399 1314.631 399 L 1363 399 1363 385.500 L 1363 372 1335.500 372 C 1320.375 372, 1308 371.645, 1308 371.211 C 1308 370.778, 1310.588 367.471, 1313.750 363.864 C 1327.631 348.030, 1338 335.455, 1338 334.454 C 1338 334.079, 1331.475 325.962, 1323.500 316.415 C 1315.525 306.869, 1309 298.820, 1309 298.529 C 1309 298.238, 1320.449 298, 1334.443 298 L 1359.886 298 1360.193 285.413 C 1360.362 278.490, 1360.312 272.640, 1360.083 272.413 C 1359.854 272.186, 1338.578 272, 1312.802 272 C 1270.718 272, 1265.874 272.164, 1265.322 273.604 Z M 463.301 327.750 C 430.278 361.784, 424 368.438, 424 369.405 C 424 370.356, 491.083 440, 491.998 440 C 492.385 440, 495.070 437.413, 497.966 434.250 C 500.862 431.087, 515.217 416.122, 529.866 400.993 C 544.515 385.865, 557.366 372.468, 558.424 371.222 L 560.348 368.958 549.408 357.729 C 509.388 316.650, 492.026 299, 491.640 299 C 491.396 299, 478.644 311.938, 463.301 327.750 Z M 1184.994 299.934 C 1171.699 303.978, 1164.496 316.513, 1164.559 335.500 C 1164.633 357.949, 1174.984 371.956, 1191.500 371.956 C 1207.513 371.956, 1216.864 359.826, 1217.773 337.872 C 1218.282 325.582, 1216.955 319.634, 1211.787 311.027 C 1206.359 301.990, 1194.448 297.058, 1184.994 299.934 Z M 897.767 303 C 895.820 308.416, 886.969 341.935, 886.983 343.844 C 887 346.167, 887.088 346.184, 896.919 345.844 C 902.374 345.655, 907.184 345.153, 907.607 344.728 C 908.030 344.304, 907.577 340.704, 906.599 336.728 C 903.693 324.911, 899.849 308.750, 899.051 305 C 898.601 302.883, 898.094 302.093, 897.767 303 Z M 133 318.009 C 111.277 321.747, 93.762 336.655, 85.840 358.149 C 82.463 367.315, 82.430 387.406, 85.778 397.089 C 88.923 406.187, 96.754 417.721, 103.700 423.488 C 109.929 428.659, 120.974 434.294, 128.101 435.937 C 134.028 437.303, 149.672 437.264, 156.190 435.866 C 168.157 433.299, 181.020 425.258, 189.482 415.054 C 203.901 397.667, 206.688 371.309, 196.302 350.543 C 184.732 327.410, 158.054 313.699, 133 318.009 Z M 1006.269 420.925 C 984.189 427.240, 968.929 443.022, 962.816 465.864 C 960.093 476.042, 959.909 493.623, 962.422 503.500 C 968.614 527.830, 985.828 544.735, 1009.208 549.447 C 1029.828 553.602, 1052.030 548.856, 1066.728 537.152 C 1073.846 531.483, 1081.186 520.691, 1085.056 510.204 C 1087.928 502.421, 1088.320 500.057, 1088.759 487.859 C 1089.359 471.177, 1087.722 462.562, 1081.692 450.652 C 1074.182 435.820, 1060.750 425.412, 1043.391 420.972 C 1033.249 418.378, 1015.252 418.355, 1006.269 420.925 Z M 1089.534 421.117 C 1088.684 424.661, 1085.146 444.480, 1085.336 444.627 C 1085.426 444.698, 1088.875 446.215, 1093 447.999 C 1108.188 454.568, 1116.683 462.478, 1123.560 476.455 C 1128.911 487.331, 1130 495.382, 1130 524.088 L 1130 549 1148.905 549 L 1167.811 549 1168.197 521.750 L 1168.583 494.500 1171.800 485.168 C 1177.170 469.590, 1185.892 459.375, 1200.063 452.066 C 1204.703 449.672, 1208.613 447.628, 1208.751 447.523 C 1209.002 447.331, 1204.222 422.519, 1203.517 420.357 C 1202.879 418.399, 1190.282 421.620, 1181.250 426.051 C 1169.396 431.864, 1160.729 440.643, 1154.901 452.739 C 1152.480 457.763, 1150.268 461.901, 1149.985 461.936 C 1149.701 461.971, 1148.638 459.637, 1147.622 456.750 C 1141.065 438.122, 1118.484 421.642, 1096.419 419.381 C 1090.354 418.760, 1090.082 418.829, 1089.534 421.117 Z M 873.884 423.750 C 873.297 425.262, 865.846 447.650, 857.325 473.500 C 835.390 540.044, 832.995 547.404, 832.998 548.273 C 832.999 548.697, 841.193 548.922, 851.207 548.773 L 869.414 548.500 875.295 526 C 878.529 513.625, 882.700 497.875, 884.562 491 C 886.425 484.125, 889.692 471.757, 891.822 463.515 L 895.695 448.530 899.416 464.515 C 901.462 473.307, 906.048 492.650, 909.606 507.500 C 913.165 522.350, 916.804 537.763, 917.693 541.750 L 919.308 549 938.654 549 C 953.463 549, 958.001 548.707, 958.002 547.750 C 958.005 546.300, 942.890 492.533, 936.289 470.511 C 933.818 462.267, 929.769 448.542, 927.291 440.011 C 924.813 431.480, 922.557 423.712, 922.277 422.750 C 921.810 421.148, 919.791 421, 898.359 421 L 874.950 421 873.884 423.750 Z M 1223 485 L 1223 549 1240 549 L 1257 549 1257 531.135 L 1257 513.269 1261.201 508.105 L 1265.402 502.940 1269.696 509.720 C 1272.057 513.449, 1278.379 523.809, 1283.745 532.743 L 1293.500 548.986 1314.285 548.993 L 1335.070 549 1333.871 546.750 C 1333.212 545.513, 1330.641 541.350, 1328.159 537.500 C 1325.677 533.650, 1322.670 528.925, 1321.476 527 C 1317.296 520.256, 1307.287 504.391, 1299.678 492.446 C 1295.455 485.817, 1292 479.868, 1292 479.227 C 1292 478.586, 1295.263 473.834, 1299.250 468.666 C 1303.237 463.499, 1310.063 454.372, 1314.417 448.385 C 1318.771 442.398, 1324.734 434.252, 1327.667 430.282 C 1330.600 426.311, 1333 422.599, 1333 422.032 C 1333 421.357, 1326.096 421, 1313.067 421 L 1293.135 421 1275.817 447.002 L 1258.500 473.003 1257.824 468.752 C 1257.452 466.413, 1257.115 454.712, 1257.074 442.750 L 1257 421 1240 421 L 1223 421 1223 485 Z M 1375.097 425.250 C 1373.663 430.245, 1362.342 466.654, 1354.030 493 C 1344.566 522.997, 1337 547.583, 1337 548.340 C 1337 548.729, 1344.949 548.923, 1354.665 548.773 L 1372.329 548.500 1375.869 535.296 L 1379.409 522.093 1384.454 521.489 C 1387.230 521.157, 1395.350 521.023, 1402.500 521.192 L 1415.500 521.500 1419.405 535.250 L 1423.310 549 1441.655 549 C 1451.745 549, 1460 548.600, 1460 548.112 C 1460 547.623, 1458.829 543.236, 1457.398 538.362 C 1455.967 533.488, 1453.753 525.900, 1452.477 521.500 C 1451.202 517.100, 1446.263 501.125, 1441.502 486 C 1436.741 470.875, 1430.292 450.063, 1427.173 439.750 L 1421.500 421.001 1398.908 421 L 1376.317 421 1375.097 425.250 Z M 1466.038 432.750 L 1466.076 444.500 1470.288 449.611 C 1472.605 452.422, 1480.013 461.276, 1486.750 469.285 C 1493.487 477.295, 1499 484.155, 1499 484.530 C 1499 485.474, 1494.049 491.721, 1483.965 503.500 C 1479.256 509, 1473.288 516.129, 1470.702 519.342 L 1466 525.183 1466 537.092 L 1466 549 1514.529 549 L 1563.058 549 1562.779 535.750 L 1562.500 522.500 1535.313 522 L 1508.126 521.500 1511.313 517.381 C 1513.066 515.116, 1520.032 506.678, 1526.794 498.630 L 1539.089 483.997 1535.294 479.165 C 1533.207 476.508, 1526.443 468.296, 1520.262 460.917 L 1509.025 447.500 1535.012 447.233 L 1561 446.967 1561 433.983 L 1561 421 1513.500 421 L 1466 421 1466.038 432.750 Z M 1017.558 449.492 C 1009.555 452.343, 1003.138 459.511, 1000.259 468.816 C 997.557 477.546, 997.836 495.713, 1000.783 503.079 C 1006.384 517.075, 1018.261 524.056, 1031.194 520.953 C 1038.231 519.265, 1045.834 511.845, 1049.077 503.500 C 1052.462 494.792, 1052.499 477.438, 1049.154 467.724 C 1044.063 452.945, 1030.246 444.972, 1017.558 449.492 Z M 1396.272 456.647 C 1395.704 459.316, 1393.203 469.231, 1390.716 478.680 C 1388.229 488.129, 1386.450 496.117, 1386.763 496.430 C 1387.077 496.744, 1392.244 497, 1398.246 497 L 1409.159 497 1408.508 493.750 C 1408.150 491.962, 1406.129 483.975, 1404.016 476 C 1401.904 468.025, 1399.859 459.925, 1399.473 458 C 1398.242 451.866, 1397.369 451.497, 1396.272 456.647 Z" stroke="none" fill="#fcfcfc" fill-rule="evenodd" /><path xmlns="http://www.w3.org/2000/svg" d="M 83 122.600 L 83 161 235.395 161 C 385.810 161, 387.875 161.026, 394.374 163.034 C 405.805 166.564, 415.619 177.606, 420.047 191.917 C 421.978 198.159, 423.979 200.092, 426.416 198.070 C 427.815 196.909, 428 191.913, 428 155.399 C 428 115.774, 427.910 113.768, 425.849 107.491 C 421.860 95.338, 411.014 86.920, 396.926 85.043 C 393.392 84.571, 321.313 84.189, 236.750 84.193 L 83 84.199 83 122.600 Z M 480.829 85.074 C 467.853 86.189, 457.562 93.311, 452.101 104.954 L 449.500 110.500 449.210 153.595 C 448.950 192.361, 449.084 196.825, 450.544 198.037 C 453.100 200.158, 455.029 198.149, 457.509 190.788 C 462.525 175.894, 471.558 166.288, 484.028 162.584 C 488.793 161.169, 505.378 161, 639.182 161 L 789 161 789 123.061 L 789 85.123 784.750 84.533 C 779.363 83.786, 489.814 84.301, 480.829 85.074 Z M 82.517 481.738 C 81.760 485.753, 81.989 541.624, 82.792 548.745 L 83.271 552.991 235.885 552.957 C 324.122 552.938, 389.778 553.306, 391.528 553.829 C 404.816 557.798, 414.757 568.248, 419.512 583.246 C 422.015 591.139, 423.851 593.199, 426.456 591.037 C 427.916 589.825, 428.050 585.361, 427.790 546.595 L 427.500 503.500 424.700 497.797 C 421.212 490.696, 413.776 483.864, 406.202 480.804 L 400.500 478.500 241.864 478.238 L 83.227 477.976 82.517 481.738 Z M 476.281 478.970 C 469.904 480.485, 462.039 485.163, 457.639 490.056 C 449.568 499.033, 449.605 498.785, 449.229 546.976 C 448.925 585.925, 449.038 589.555, 450.587 590.687 C 453.440 592.773, 455.547 590.576, 457.456 583.523 C 460.968 570.549, 470.744 559.512, 482.748 554.968 L 488.500 552.790 638.500 552.645 L 788.500 552.500 788.762 515.250 L 789.024 478 634.262 478.102 C 549.143 478.159, 478.052 478.549, 476.281 478.970 Z" stroke="none" fill="#f86301" fill-rule="evenodd" /></svg>`,

  // Partner logo, dark variant — same Agios Loukas mark, letters in #585857
  // Use on light backgrounds; the white variant is for dark surfaces.
  "partner-logo-dark": `<svg xmlns="http://www.w3.org/2000/svg" width="1181" height="433" viewBox="2 2 1181 433"><path d="M 63.230 110.035 C 52.418 111.396, 39.084 114.729, 24.500 119.714 C 7.912 125.385, 2.500 128.056, 2.500 130.572 C 2.500 132.266, 3.290 132.515, 9 132.624 C 17.163 132.779, 20.513 134.200, 30.500 141.743 C 43.426 151.505, 57.670 166.196, 112.786 226.605 C 167.890 287.002, 170.926 289.913, 184.507 295.394 C 204.378 303.414, 232.178 303.200, 260.500 294.810 C 274.205 290.750, 291.098 284.142, 293.418 281.934 C 296.625 278.881, 294.072 277.133, 286.571 277.247 C 278.879 277.364, 275.764 275.715, 261.859 264.167 C 244.858 250.048, 232.865 237.722, 181.479 181.551 C 129.371 124.591, 125.888 121.230, 113.500 115.952 C 100.477 110.403, 79.712 107.959, 63.230 110.035 Z M 335.500 109.630 C 321.142 111.184, 303.838 115.549, 286.530 121.981 C 273.777 126.721, 271 128.329, 271 130.972 C 271 132.694, 271.714 132.886, 277.750 132.785 C 293.879 132.516, 304.294 141.986, 384.449 229.801 C 410.705 258.566, 434.508 283.950, 437.344 286.208 C 460.636 304.759, 498.644 306.221, 543 290.271 C 560.041 284.143, 563.205 282.455, 562.813 279.698 C 562.528 277.698, 561.896 277.489, 555.814 277.383 C 547.714 277.241, 544.131 275.363, 530.707 264.228 C 514.516 250.797, 500.782 236.673, 451.240 182.500 C 424.581 153.350, 400.093 127.382, 396.822 124.793 C 384.772 115.256, 369.503 110.241, 350.500 109.580 C 344.450 109.369, 337.700 109.392, 335.500 109.630 Z M 608 135 L 608 160 613.500 160 L 619 160 619 151.674 C 619 144.321, 619.264 143.101, 621.262 141.224 L 623.523 139.099 629.457 149.550 L 635.391 160 641.802 160 C 649.480 160, 649.657 161.191, 639.472 144.291 C 635.362 137.472, 632 131.654, 632 131.362 C 632 131.070, 635.629 126.144, 640.066 120.415 L 648.131 110 640.816 110.018 L 633.500 110.035 626.500 120.699 L 619.500 131.363 619.216 120.681 L 618.932 110 613.466 110 L 608 110 608 135 Z M 658.250 133.813 C 654.263 146.947, 651 158.213, 651 158.847 C 651 159.579, 653.021 160, 656.531 160 C 660.809 160, 662.210 159.616, 662.713 158.305 C 663.071 157.372, 665.438 148.593, 667.973 138.795 L 672.581 120.982 678.023 140.491 L 683.465 160 689.732 160 C 693.180 160, 695.996 159.887, 695.990 159.750 C 695.985 159.613, 692.487 148.475, 688.216 135 L 680.453 110.500 672.976 110.216 L 665.500 109.933 658.250 133.813 Z M 702 135 L 702 160 707.500 160 L 713 160 713 135 L 713 110 707.500 110 L 702 110 702 135 Z M 723 135 L 723 160 728 160 L 733 160 733 142.344 L 733 124.688 738.383 135.094 C 741.344 140.817, 745.562 148.650, 747.757 152.500 L 751.748 159.500 757.874 159.798 L 764 160.095 764 135.048 L 764 110 758.370 110 L 752.740 110 753.190 126.425 L 753.639 142.850 749.024 133.675 C 746.486 128.629, 742.497 121.237, 740.160 117.250 L 735.912 110 729.456 110 L 723 110 723 135 Z M 773.233 134.750 L 773.500 159.500 779.250 159.800 L 785 160.100 785 135.050 L 785 110 778.983 110 L 772.965 110 773.233 134.750 Z M 794 135 L 794 160 800 160 L 806 160 806 151.611 C 806 144.943, 806.379 142.753, 807.847 140.941 L 809.694 138.660 815.505 148.922 C 818.700 154.566, 821.857 159.392, 822.519 159.646 C 823.182 159.900, 826.262 159.971, 829.364 159.804 L 835.004 159.500 828.410 148.500 C 824.783 142.450, 820.952 136.088, 819.896 134.362 L 817.975 131.224 825.283 121.862 C 829.302 116.713, 832.934 111.938, 833.354 111.250 C 833.937 110.296, 832.448 110, 827.065 110 L 820.011 110 813.256 120.153 L 806.500 130.305 806.215 120.153 L 805.930 110 799.965 110 L 794 110 794 135 Z M 839.233 134.750 L 839.500 159.500 845.250 159.800 L 851 160.100 851 149.550 L 851 139 860 139 L 869 139 869 149.550 L 869 160.100 874.750 159.800 L 880.500 159.500 880.767 134.750 L 881.035 110 875.017 110 L 869 110 869 119.500 L 869 129 860 129 L 851 129 851 119.500 L 851 110 844.983 110 L 838.965 110 839.233 134.750 Z M 864 183.567 C 840.945 188.559, 826.275 206.671, 824.392 232.468 C 822.855 253.511, 833.569 274.754, 849.817 282.882 C 864.874 290.414, 885.694 290.147, 900.354 282.234 C 906.857 278.724, 914.740 270.826, 918.272 264.284 C 924.526 252.698, 926.853 232.636, 923.470 219.460 C 918.536 200.246, 905.431 187.503, 886.500 183.511 C 877.964 181.711, 872.507 181.724, 864 183.567 Z M 626.494 185.250 C 626.250 185.938, 619.723 208.325, 611.989 235 C 604.256 261.675, 597.689 284.288, 597.397 285.250 C 596.908 286.861, 598.019 287, 611.347 287 L 625.829 287 628.582 275 L 631.335 263 644.513 263 L 657.690 263 660.959 275 L 664.228 287 679.230 287 C 693.035 287, 694.195 286.860, 693.753 285.250 C 693.488 284.288, 686.594 261.113, 678.432 233.750 L 663.592 184 645.265 184 C 631.506 184, 626.827 184.312, 626.494 185.250 Z M 707 235.500 L 707 287 721 287 L 735 287 735 247 L 735 207 754 207 L 773 207 773 195.500 L 773 184 740 184 L 707 184 707 235.500 Z M 782 235.500 L 782 287 796 287 L 810 287 810 235.500 L 810 184 796 184 L 782 184 782 235.500 Z M 933 193.033 L 933 202.065 946 218.538 C 953.150 227.598, 959 235.402, 959 235.881 C 959 236.360, 953.108 244.117, 945.906 253.118 C 938.704 262.119, 932.384 270.283, 931.860 271.261 C 931.337 272.238, 931.042 276.067, 931.205 279.769 L 931.500 286.500 971.250 286.761 L 1011 287.023 1011 275.531 L 1011 264.038 988.896 263.769 L 966.792 263.500 977.881 249.500 C 983.979 241.800, 988.976 235.208, 988.985 234.851 C 988.993 234.495, 984.286 228.082, 978.524 220.601 L 968.048 207 988.024 207 L 1008 207 1008 195.500 L 1008 184 970.500 184 L 933 184 933 193.033 Z M 302.508 216.519 L 275.760 245.116 277.700 247.308 C 280.410 250.370, 322.583 295.775, 326.448 299.791 L 329.615 303.081 356.352 274.425 C 371.058 258.664, 382.957 245.421, 382.795 244.995 C 382.455 244.104, 334.254 192.406, 331.251 189.711 C 329.296 187.957, 328.727 188.487, 302.508 216.519 Z M 46.105 205.528 C 29.399 210.190, 16.017 224.448, 11.982 241.886 C 10.146 249.819, 11.200 262.073, 14.400 270 C 27.247 301.826, 68.834 310.326, 93.080 286.080 C 117.509 261.651, 108.571 219.436, 76.324 206.943 C 68.799 204.027, 53.970 203.333, 46.105 205.528 Z M 866.193 206.675 C 858.796 210.321, 854 221.863, 854 236.023 C 854 255.263, 861.602 266.006, 875.210 265.996 C 883.641 265.990, 889.911 260.857, 893.614 250.931 C 896.079 244.323, 896.080 227.040, 893.616 220.500 C 891.261 214.246, 887.694 209.394, 883.634 206.919 C 879.700 204.520, 870.818 204.396, 866.193 206.675 Z M 643.752 207 C 643.446 207.825, 641.422 216.037, 639.256 225.250 L 635.317 242 644.461 242 L 653.606 242 649.331 225.250 C 646.980 216.037, 644.888 207.825, 644.683 207 C 644.351 205.667, 644.248 205.667, 643.752 207 Z M 734.634 304.586 C 711.849 310.102, 697 330.451, 697 356.161 C 697 367.402, 698.353 373.729, 702.730 382.948 C 708.951 396.053, 720.542 405.102, 734.931 408.089 C 742.785 409.720, 758.054 408.697, 765.674 406.029 C 784.308 399.506, 795.759 382.914, 797.510 359.903 C 799.153 338.314, 789.310 317.774, 773.210 309.192 C 762.135 303.289, 747.307 301.519, 734.634 304.586 Z M 801.333 315.092 C 799.511 325.120, 799.470 326.233, 800.909 326.691 C 806.789 328.562, 815.349 333.643, 818.504 337.136 C 820.550 339.401, 823.506 344.009, 825.073 347.377 C 830.309 358.628, 831.230 363.912, 831.888 386.500 L 832.500 407.500 846.103 407.777 L 859.705 408.055 860.309 391.277 C 861.031 371.220, 862.612 363.242, 868.055 352.201 C 873.101 341.963, 881.071 333.493, 889.301 329.622 C 893.684 327.560, 894.978 326.479, 894.596 325.197 C 894.029 323.288, 891.008 305.986, 891.003 304.614 C 890.997 303.030, 882.077 304.902, 876.217 307.717 C 869.233 311.072, 858.540 321.498, 854.707 328.691 C 853.185 331.545, 851.097 337.170, 850.068 341.191 C 848.391 347.735, 848.127 348.186, 847.540 345.500 C 847.180 343.850, 846.433 340.475, 845.882 338 C 842.384 322.304, 830.138 309.519, 814.650 305.395 C 811.817 304.641, 808.116 304.018, 806.425 304.012 L 803.349 304 801.333 315.092 Z M 626.467 306.250 C 625.860 307.862, 597 407.165, 597 407.641 C 597 407.838, 603.495 408, 611.433 408 C 624.322 408, 625.918 407.813, 626.362 406.250 C 628.129 400.025, 641.145 342.164, 642.113 336.233 C 642.765 332.236, 643.537 329.203, 643.827 329.494 C 644.118 329.785, 647.371 342.055, 651.057 356.761 C 654.743 371.468, 659.220 389.012, 661.007 395.750 L 664.257 408 679.128 408 C 687.308 408, 694.020 407.663, 694.045 407.250 C 694.070 406.837, 687.207 383.668, 678.795 355.762 L 663.500 305.024 645.219 305.012 C 631.502 305.003, 626.820 305.312, 626.467 306.250 Z M 905.241 356.250 L 905.500 407.500 919 407.500 L 932.500 407.500 932.776 391.637 L 933.052 375.773 936.682 371.343 C 938.679 368.906, 940.654 367.270, 941.072 367.706 C 941.489 368.143, 946.142 376.777, 951.412 386.894 C 956.682 397.010, 961.500 405.898, 962.119 406.644 C 962.978 407.679, 966.914 408, 978.729 408 C 992.050 408, 994.134 407.791, 993.641 406.507 C 993.326 405.686, 986.063 392.858, 977.500 378 C 968.937 363.142, 961.687 350.347, 961.388 349.567 C 961.067 348.731, 967.433 339.294, 976.899 326.575 L 992.954 305 975.727 305.020 L 958.500 305.039 955.408 310.270 C 953.708 313.146, 947.970 322.646, 942.658 331.379 L 933 347.258 933 326.129 L 933 305 918.991 305 L 904.982 305 905.241 356.250 Z M 1027.931 305.250 C 1027.893 305.387, 1021.211 328.225, 1013.081 356 C 1004.952 383.775, 998.484 406.837, 998.709 407.250 C 998.934 407.663, 1005.356 408, 1012.981 408 L 1026.845 408 1029.672 396.007 L 1032.500 384.015 1045.679 384.007 L 1058.858 384 1060.473 389.750 C 1061.362 392.913, 1062.869 398.200, 1063.823 401.500 L 1065.557 407.500 1080.278 407.777 C 1088.375 407.929, 1095 407.655, 1095 407.168 C 1095 406.481, 1083.034 365.905, 1065.387 306.750 C 1064.915 305.166, 1063.122 305, 1046.433 305 C 1036.295 305, 1027.969 305.113, 1027.931 305.250 Z M 1105 313.863 L 1105 322.726 1118 339.310 C 1125.150 348.432, 1131 356.178, 1131 356.524 C 1131 356.871, 1124.688 365.107, 1116.974 374.827 L 1102.948 392.500 1103.224 400 L 1103.500 407.500 1143.250 407.761 L 1183 408.023 1183 396.511 L 1183 385 1161 385 C 1148.900 385, 1139 384.732, 1139 384.404 C 1139 384.077, 1143.950 377.555, 1150 369.911 C 1156.050 362.268, 1161 355.760, 1161 355.449 C 1161 355.138, 1156.500 349.086, 1151 342 C 1145.500 334.914, 1141 328.875, 1141 328.580 C 1141 328.285, 1149.662 327.921, 1160.250 327.772 L 1179.500 327.500 1179.783 316.250 L 1180.066 305 1142.533 305 L 1105 305 1105 313.863 Z M 740.500 326.388 C 735.998 328.353, 730.485 335.054, 728.385 341.114 C 727.016 345.064, 726.523 349.299, 726.538 357 C 726.555 366.342, 726.863 368.159, 729.325 373.473 C 732.756 380.875, 734.430 382.791, 739.500 385.119 C 749.939 389.913, 759.774 385.456, 765.135 373.500 C 767.867 367.408, 768.807 353.206, 767.042 344.702 C 764.054 330.308, 751.448 321.609, 740.500 326.388 Z M 1044.660 328 C 1040.665 344.241, 1036.814 362.148, 1037.228 362.561 C 1037.514 362.847, 1041.544 362.951, 1046.184 362.791 L 1054.620 362.500 1049.947 344 C 1046.593 330.720, 1045.101 326.205, 1044.660 328 Z" stroke="none" fill="#585857" fill-rule="evenodd"/><path d="M 11.238 38.750 L 11.500 75.500 129.500 76 L 247.500 76.500 251.500 78.662 C 258.752 82.583, 266 92.444, 266 98.389 C 266 101.825, 268.735 104.465, 270.649 102.876 C 271.863 101.869, 272.041 95.614, 271.793 62.592 L 271.500 23.500 268.689 17.776 C 267.143 14.627, 264.053 10.489, 261.822 8.580 C 253.677 1.608, 261.537 2, 129.810 2 L 10.975 2 11.238 38.750 Z M 309.606 3.568 C 303.455 5.822, 297.438 11.409, 294.318 17.761 L 291.500 23.500 291.197 62.584 C 290.923 98.017, 291.050 101.796, 292.555 103.046 C 293.990 104.237, 294.406 104.165, 295.608 102.521 C 296.374 101.474, 297.004 99.691, 297.010 98.559 C 297.027 94.917, 301.575 86.580, 305.355 83.261 C 313.735 75.904, 302.223 76.556, 433.500 76 L 551.500 75.500 551.762 38.750 L 552.025 2 432.762 2.070 C 332.075 2.130, 312.894 2.363, 309.606 3.568 Z M 11.686 333.647 C 11.309 334.024, 11 350.683, 11 370.667 L 11 407 125.782 407 C 250.193 407, 246.860 406.859, 254.945 412.462 C 259.278 415.464, 264.517 422.854, 265.429 427.250 C 265.743 428.762, 266.241 431.154, 266.535 432.565 C 266.944 434.523, 267.595 435.055, 269.285 434.815 L 271.500 434.500 271.491 394.500 C 271.483 358.231, 271.316 354.144, 269.699 350.683 C 266.985 344.869, 260.542 338.492, 254.727 335.863 L 249.500 333.500 130.936 333.230 C 65.726 333.082, 12.064 333.269, 11.686 333.647 Z M 313.734 334.086 C 304.683 336.223, 297.741 341.940, 293.801 350.500 C 291.549 355.394, 291.494 356.293, 291.204 392.997 C 291.041 413.620, 291.162 431.508, 291.473 432.747 C 292.306 436.069, 295.816 435.723, 296.516 432.250 C 299.152 419.156, 306.900 410.474, 318.089 408.074 C 321.494 407.344, 359.749 407, 437.562 407 L 552.025 407 551.762 370.250 L 551.500 333.500 434.500 333.348 C 369.094 333.264, 315.840 333.589, 313.734 334.086 Z" stroke="none" fill="#d0671c" fill-rule="evenodd"/></svg>`,
};
