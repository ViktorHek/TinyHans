# TinyHans

TinyHans är en WUSIWUG-editor inspirerad av TinyMCE. WUSIWUG står för "what you see is what you get". Iden är att man i realtisd editerar en text som presenteras på samma sätt för den som stiver texten som för den som läser texten. Detta görs genom att konvertera all input från användaren till HTML som kan läsas av en dator.

## bakgrund
Under min praktik på Talentech så hade jag en gång ett möte med min handledare då jag hade fått i uppdag att lösa en bugg som gjorde att TinyMCE gav ett error meddelande i console loggen. Jag viste sen innan att Talentech inte vill använda sig av externa packet eller bibliotek, delvis av just den här anledningen. så jag frågade honom:

- Michal, why do we use TinyMCE 
Han svarade:
- we could create our own one but it would take to much time. It's standard to use TinyMCE becouse noone has the time or energy to create there own one. 

Det var då jag bestämde mig för att ge det ett försök. 

## User Flow 

Den här delen av raporten kommer ägna sig åt att förklara hur det är tänkt att en användare ska gå igenom applicationens flöde.
Notera att applicationen är menad att användas inom någon form av kontext. till exempel att en person är på en hemsida där hen vill skriva ett mail.

När användaren (vi kallar hen John) öppnar applicationen kan han initsialt inte skriva något. John måste först klicka på editeraren för att göra den aktiv. John klickar på rutan och börjar skriva. Det är en lång text med titlar och under titlar. Så John börjar men en ny rad, centrerar texten och gör den "bold". 
- En ny rad skapr han genom att klicka enter. 
- För att göra texten "bold" så klickar han på knappen med ett "B" i "bold" text
- För att centrera texten så klickar han först på knappen med de vänster dragna sträcken. Detta öppnar en drop-down där han behöver klicka på de centererade stäcken.

Han skapar en ny rad, sätter texten till vänster och skriver sin bröd text. Han har med en del citat och skriver dessa i kursiv stil.

- Klickar enter igen för en ny rad.
- Inställningarna från den tidigare raden är kvar. Därför behöver John göra om de tidigare ändringarna.
- För att göra texten kursiv så klickar han på knappen med ett "I" i kursiv text.

Efter ett tag skriver John fel. Han tar bort texten han nyss skrivit och ersätter det med en bättre text. Han läser igenom hela texten och märker att det finns ett stavfel längre upp. Han klickar på texten där han skrev fel, tar bort den och ersätter det med en bättre text. Sen använder han framåt pilen för att komma tillbaka till slutet av texten. 

- För att ta bort texten så klickar han på delete knappen.
- För att ändra vart i texten du vill editera så behöver du klicka på den delen av texten. Det finns en placeholder som visar vart i texter du skirver. Placeholdern är ett blinkande rakt sträck.
- För att stegvis ändra vart i texten han skriver så kan John använda vänster pilen för att gå bakot, eller höger pilen för att gå frammot.



## Metod

Jag valde att använda mig av Typescript och react för att skapa den här applikationen. React är ett ramvärk som jag känner mig van vid och har använt mycket tidigare. detta gjorde att jag kunde ta inperation från gammla projekt, förutsatt att det är något som jag har jobbat med innan.
Jag använde typescript som språk för att det är det språket vi har studerat under studie tiden och det är det spårket som används på Talentech.

## Kod

Detta kapitel kommer vara indelat basetat på funktion. 
Grundfunktionaliteten i applikationen är att skapa nya html element samtidigt som användaren vill integrera dem. Detta gör att applicationen förlitar sig väldigt mycket på document.createElement(). Varje gång en tanjent är klickad medans editorn är aktiv kommer kalla på en funktion som skapar, ändrar eller tar bort html element. Bokstäver och mellanslags-tanjenten används för att skapa text, pilarna används för navigering och "delete-knappen" används för att ta bort text. Editorn börjar initsialt utan text. Editorn är ett div-element som har ett span-element innuti, som i sin tur har ett span-element, som åter igen har ett span-element i sig. Det intersta span-elementet kallar jag för "placeholder". Det är ett blinkande sträck som indikerar vart i texten användaren skriver. 
Det första span-elementet agerar som en rad, den andra som ett ord och den sista som en bokstav. Skilnaden blir som tydligast när man kollar i CSS filen. Då det är olika regler som gäller beroende på vliken typ av element det gäller. Detta görs för att se till att ord sitter ihop, även om de blir så pass långa att de tar upp en större brädd än vad editorn har tillgång till.

När bokstäver skrivs så injecerar jag dem till vänster om vart placeholder-elementet är. Om ett mellanslag används så läggs det till ett "ord-span-element" till höger om där placeholder-elementet är. Slutligen, om man klickar "enter" så skapas ett nytt "rad-span-element" under positionen av placeholder-elementet. 

### App.tsx

Den här filen är huvudkomponenten. Alla inputs, element och funktioner går genom app komponenten.

#### HandleEditorFocus

Det första vi ser är <HandleEditorFocus>. Det är en "custom hook" som registrerar om användaren har klickat innuti editor rutan eller utanför. Funktionen används för att avgöra om användaren har avtiverat editorn eller inte. Då iden är att använda den här editorn i kontexten av en hemsida så vill jag inte att den ska ta in några kanjent inputs tills den vet att användaren vill skiva i editorn.

HandleEditorFucus har tre attribut.

ref: är en referens till vad det är man ska skicka för att editorn ska räknas som aktiv. Jag har valt att sätta refferencen på den inre kontainen. Detta för att kunna interagera med knapparna i de övre hörnen utan att påverka vida editorn är aktiv eller inte.

isEditorFocused: är en boolean som visar om editorn är aktiv eller inte. den är satt till false initsialt då jag vill att användaren ska välja att skriva något innan editorn blir aktiv. 

setIsEditorFocused: är en setter som sätter värdet på isEditorFocused variabeln.

#### clickOut

clickOut är en funktion som används för att byta vart i texten du skriver genom att klicka på den delen av texten du vill ändra. Funktionen är aktiverad genom ett mouse-down event. 
Eventet skickas med i funktionen. De första raderna av if-statements är till för att bara kalla på funktionen om användaren klickar innuti editorn. Funktionen skapar en ny placeholder och tar bort den gammla. Om användaren klickar någonstans i texten så kommer en förälder komponenterna att vara editorn. Annars betyder det att användaren har klickar innuti editorn, men utanför texten. 
Om användaren klickar på texten så kommer den nya placeholdern sättas där användaren klickar. 
Om användaren klickar innuti editorn med utanför texten, så kommer den nya placeholdern att plaseras i stutet av texten. 
Anledningen till varför är för att text är skirven från toppen neråt. Vilket innebär att om en användare klickar utanför texten så måste personen klicka någonstans under texten. därför, oavsätt horisontell positionering av klicket, så anser jag att det är mest användarvänligt att börja från slutet.

#### useKeys

UseKeys är yttligare en custom-hook. Den används för att registrera alla kanjentinputs. Det finns en event listerner som lyssnar efter kanjenter som trycks ner och när de åker upp igen. funktionen använder sig av useEffect. 
Jag använder mig av event.preventDefault() för att säkerhetställa att jag har full kontroll över funktioneliteten av applicationen. vissa tanjenter har funktionaqlitet utöver att skriva ord. då jag inte har koll på alla dessa olika funktioner så vill jag inte riskera aqtt någon går snätt sm ett resultat av de funktionerna.
Om isEditorFocused är lika med false så betyder det att editorn inte är aktiv och därför ska inte tanjentinput registreras. <arrowKeys> är en array av keyCode vadet för alla olika pil-tanjenter man kan välja mellan. Då dessa tanjenter navigerar texten och alla andra tanjenter ändrar texten så valde jag att separera funktionerna med en if-statment. 

#### movePlaceholder

Funktioner är till för att ändra positionen på placholdern ett steg framåt eller ett steg bakot. I funktionen så börjar vi med att hitta den nuvarande placeholdern och skapar en ny. Den första sekvensen av if-statements är till för att undvika ett specefikt fall. Vilket är att du inte kan gå bakot om du nyss har skrivit ett mellanslag och är i slutet av texten. Därför kollar jag efter det specifica senariot. Jag börjar med att verifiera att sista bokstaven på sista ordet i sista raden är placeholder-elementet, sen kollar jag om "bokstavs-span-elementet" innehåller programeringsspråks koden för mellanslag och om användaren vill gå bakot i texten. I det fallet så ska placeholdern placeras i slutet på det tidiagre ordet för att kunna separera element med ord från element med mellanslag.

Ett flertal variabler deklareras i funktionen för att förkla processen av att hantera alla edge-cases. i Majoriteten av alla fall så behövs bara variablerna "sibling" och "ajust". 

- siblings: Alla andra bokstaver i ordet som placeholder-elementet befinner sig i. 
- currentIndex: Index positionen av placeholder-elemtentet i förhållande till de andra bokstäverna i odert.
- sibling: Avgör om den nya placeholdern ska placeras i relation till elementet till vänster eller höger om den nuvarande placeholdern. 
- child: Används i edge-cases där placeholdern ska flyttas mellan ord eller rader. Som generell regel så används oftas "lastChild" som applikationen använder sig av. Men variabeln behövs om man ska används högerpilen för att gå framåt till en ny rad i ett senario där den nedre raden har mer än ett ord. Då behöver placeholder-elementet placeras på det första ordet istället för det sista. 
- ajust: Avgör om den nya placeholdern ska placeras till vänster eller höger om elementet som används som referanspunkt för den nya placeholdern. 
- isInit: En boolean som visar true om den nuvarande placeholdern är den första bokstaven i ordet och om användaren vill gå bakot i texten.
- isWordStart: En boolean som visar true om det nuvarande placeholder-elementet är efter den fösta bokstaven i ordet och om användaren vill gå bakot i texten. Variablen kollar om placeholdern är det andra elementet i ordet för att placeholden ska förflyttas till slutet av ordet innan om man går till vänster om den första bokstaven.
- isWordEnd: En boolean som visar true om den nuvarande placeholdern är i slutet av ordet och användaren vill gå framot i texten. 

följande if-statement avgör om placeholdern är i början eller i slutet av ett ord. Om inget av edge-casen stämmer in så förflyttas placeholder-elementet till nästa elemtent om användaren vill gå framåt och till det tidigare elementet om användaren vill gå bakot. 
Om något av fallen stämmer så går funktionen vidare till else delen. först säkerställs att placeholder-elementet inte är det fösta eller sista elementet i texten. Efter det kontroleras att det finns ett element brevid plaveholderns förälder-element i den riktning som användaren vill navigera till. Om det finns så blir variablent target till placeholderns förälderelements syskons-elements barn. Om placeholderns förälderelement inte har något syskon i den riktningen som användaren vill navigera till så betyder det att nästa bokstav finns på en ny rad, då vi redan säkerhetställt att placeholder-elementet inte är i början eller slutet av texten. Om det är fallet så blir target variablent placeholderns förälders förälders syskon-elements barnbarn. 
Funktionen avslutas med att den tidigare placeholden tas bort. Detta måste göras i slutet då vi använder elementet som referenspunk för vart man ska placera den nya placeholdern. 


