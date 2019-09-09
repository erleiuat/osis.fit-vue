<template>
    <vcontainer>
        <v-row justify="center">

            <v-col cols="12" md="11" class="display-1">
                {{ $t('title') }}
            </v-col>

            <v-col cols="12" md="11" v-html="$t('text')" />

            <v-col cols="12" md="5">
                <v-btn outlined block :to="{name:'help.contact'}">
                    {{ $t('contact') }}
                </v-btn>
            </v-col>
            <v-col cols="12" md="5" class="text-sm-right">
                <p class="caption">{{ $t('langNotice') }} <a href="https://www.deepl.com/">Deepl.com</a></p>
            </v-col>

        </v-row>
    </vcontainer>
</template>

<script>
export default {
    name: 'Data',

    i18n: {
        messages: {
            en: {
                title: 'Privacy-Policy',
                contact: 'Contact',
                langNotice: 'Translated by',
                text: `
                <p class="body-2">
                    Verantwortliche Stelle im Sinne der Datenschutzgesetze, insbesondere der EU-Datenschutzgrundverordnung (DSGVO), ist:
                </p>
                <p class="body-2">
                    Osis.io<br/>
                    4058 Basel (Schweiz CH)<br/>
                    E-Mail: <a target="_blank" href="mailto:mail@osis.io">mail@osis.io</a><br/>
                    WebSite: https://osis.fit/ 
                </p>
                <div class="headline font-weight-light">Allgemeiner Hinweis</div> 
                <p class="body-2">
                    Gestützt auf Artikel 13 der schweizerischen Bundesverfassung und die datenschutzrechtlichen Bestimmungen des 
                    Bundes (Datenschutzgesetz, DSG<!--DSG-->) hat jede Person Anspruch auf Schutz ihrer Privatsphäre sowie auf 
                    Schutz vor Missbrauch ihrer persönlichen Daten. Die Betreiber dieser Seiten nehmen den Schutz Ihrer 
                    persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend 
                    der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
                </p>
                <p class="body-2">
                    In Zusammenarbeit mit unseren Hosting-Providern bemühen wir uns, die Datenbanken so gut wie möglich vor fremden Zugriffen, 
                    Verlusten, Missbrauch oder vor Fälschung zu schützen.</p><p class="body-2">Wir weisen darauf hin, dass die 
                    Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. 
                    Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.
                </p>
                <p class="body-2">
                    Durch die Nutzung dieser WebSite erklären Sie sich mit der Erhebung, Verarbeitung und Nutzung von Daten gemäss der 
                    nachfolgenden Beschreibung einverstanden. Diese WebSite kann grundsätzlich ohne Registrierung besucht werden. 
                    Dabei werden Daten wie beispielsweise aufgerufene Seiten bzw. Namen der abgerufenen Datei, Datum und Uhrzeit zu 
                    statistischen Zwecken auf dem Server gespeichert, ohne dass diese Daten unmittelbar auf Ihre Person bezogen werden. 
                    Personenbezogene Daten, insbesondere Name, Adresse oder E-Mail-Adresse werden soweit möglich auf freiwilliger 
                    Basis erhoben. Ohne Ihre Einwilligung erfolgt keine Weitergabe der Daten an Dritte.
                </p>
                <div class="headline font-weight-light">Bearbeitung von Personendaten</div> 
                <p class="body-2">
                    Personendaten sind alle Angaben, die sich auf eine bestimmte oder bestimmbare Person beziehen. Eine betroffene Person 
                    ist eine Person, über die Personendaten bearbeitet werden. Bearbeiten umfasst jeden Umgang mit Personendaten, 
                    unabhängig von den angewandten Mitteln und Verfahren, insbesondere das Aufbewahren, Bekanntgeben, Beschaffen, 
                    Löschen, Speichern, Verändern, Vernichten und Verwenden von Personendaten.</p> <p class="body-2">Wir bearbeiten Personendaten 
                    im Einklang mit dem schweizerischen Datenschutzrecht. Im übrigen bearbeiten wir – soweit und sofern die EU-DSGVO 
                    anwendbar ist – Personendaten gemäss folgenden Rechtsgrundlagen im Zusammenhang mit Art. 6 Abs. 1 DSGVO<!--DSGVO-->:
                </p> 
                <ul> 
                    <li>
                        lit. a) Bearbeitung von Personendaten mit Einwilligung der betroffenen Person.
                    </li> 
                    <li>
                        lit. b) Bearbeitung von Personendaten zur Erfüllung eines Vertrages mit der betroffenen Person sowie zur 
                        Durchführung entsprechender vorvertraglicher Massnahmen.
                    </li> 
                    <li>
                        lit. c) Bearbeitung von Personendaten zur Erfüllung einer rechtlichen Verpflichtung, der wir gemäss 
                        allenfalls anwendbarem Recht der EU oder gemäss allenfalls anwendbarem Recht eines Landes, in dem 
                        die DSGVO<!--DSGVO--> ganz oder teilweise anwendbar ist, unterliegen.
                    </li> 
                    <li>
                        lit. d) Bearbeitung von Personendaten um lebenswichtige Interessen der betroffenen Person oder einer 
                        anderen natürlichen Person zu schützen.
                    </li>
                    <li>
                        lit. f) Bearbeitung von Personendaten um die berechtigten Interessen von uns oder von Dritten zu wahren, 
                        sofern nicht die Grundfreiheiten und Grundrechte sowie Interessen der betroffenen Person überwiegen. 
                        Berechtigte Interessen sind insbesondere unser betriebswirtschaftliches Interesse, unsere Website 
                        bereitstellen zu können, die Informationssicherheit, die Durchsetzung von eigenen 
                        rechtlichen Ansprüchen und die Einhaltung von schweizerischem Recht.
                    </li> 
                </ul> 
                <p class="body-2">
                    Wir bearbeiten Personendaten für jene Dauer, die für den jeweiligen Zweck oder die jeweiligen 
                    Zwecke erforderlich ist. Bei länger dauernden Aufbewahrungspflichten aufgrund von gesetzlichen und 
                    sonstigen Pflichten, denen wir unterliegen, schränken wir die Bearbeitung entsprechend ein.
                </p>
                <div class="headline font-weight-light">Datenschutzerklärung für Cookies</div>
                <p class="body-2">
                    Diese WebSite verwendet Cookies. Das sind kleine Textdateien, die es möglich machen, auf dem Endgerät 
                    des Nutzers spezifische, auf den Nutzer bezogene Informationen zu speichern, während er die Website nutzt. 
                    Cookies ermöglichen es, insbesondere Nutzungshäufigkeit und Nutzeranzahl der Seiten zu ermitteln, 
                    Verhaltensweisen der Seitennutzung zu analysieren, aber auch unser Angebot kundenfreundlicher zu gestalten. 
                    <!--Allg.Cookies-->Cookies bleiben über das Ende einer Browser-Sitzung gespeichert und können bei 
                    einem erneuten Seitenbesuch wieder aufgerufen werden. Wenn Sie das nicht wünschen, sollten Sie Ihren 
                    Internetbrowser so einstellen, dass er die Annahme von Cookies verweigert.
                </p> 
                <p class="body-2">
                    Ein genereller Widerspruch gegen den Einsatz der zu Zwecken des Onlinemarketing eingesetzten Cookies kann bei einer 
                    Vielzahl der Dienste, vor allem im Fall des Trackings, über die US-amerikanische Seite 
                    <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener">http://www.aboutads.info/choices/</a> 
                    oder die EU-Seite <a href="http://www.youronlinechoices.com/" target="_blank" rel="noopener">http://www.youronlinechoices.com/</a> 
                    erklärt werden. Des Weiteren kann die Speicherung von Cookies mittels deren Abschaltung in den Einstellungen des Browsers 
                    erreicht werden. Bitte beachten Sie, dass dann gegebenenfalls nicht alle Funktionen dieses Onlineangebotes genutzt werden können.
                </p>
                <div class="headline font-weight-light">Datenschutzerklärung für SSL-/TLS-Verschlüsselung</div>
                <p class="body-2">
                    Diese WebSite nutzt aus Gründen der Sicherheit und zum Schutz der übertragung vertraulicher Inhalte, wie zum Beispiel der 
                    Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL-/TLS-Verschlüsselung. Eine verschlüsselte Verbindung 
                    erkennen Sie daran, dass die Adresszeile des Browsers von "http://" auf "https://" wechselt und an dem 
                    Schloss-Symbol in Ihrer Browserzeile. Wenn die SSL bzw. TLS Verschlüsselung aktiviert ist, können die Daten, 
                    die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.
                </p>
                <div class="headline font-weight-light">Datenschutzerklärung für Server-Log-Files</div>
                <p class="body-2">
                    Der Provider dieser WebSite erhebt und speichert automatisch Informationen in so genannten Server-Log Files, die Ihr Browser 
                    automatisch an uns übermittelt. Dies sind:
                </p> 
                <ul> 
                    <li>Browsertyp und Browserversion</li> 
                    <li>verwendetes Betriebssystem</li> 
                    <li>Referrer URL</li> 
                    <li>Hostname des zugreifenden Rechners</li> 
                    <li>Uhrzeit der Serveranfrage</li> 
                </ul> 
                <p class="body-2">
                    Diese Daten sind nicht bestimmten Personen zuordenbar. Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. 
                    Wir behalten uns vor, diese Daten nachträglich zuprüfen, wenn uns konkrete Anhaltspunkte für eine rechtswidrige Nutzung bekannt werden.
                </p>
                <div class="headline font-weight-light">Dienste von Dritten</div> 
                <p class="body-2">
                    Diese WebSite verwenden allenfalls Google Maps für das Einbetten von Karten, Google Invisible reCAPTCHA für den Schutz gegen Bots und Spam sowie 
                    YouTube für das Einbetten von Videos. Diese Dienste der amerikanischen Google LLC verwenden unter anderem Cookies und infolgedessen werden Daten an 
                    Google in den USA übertragen, wobei wir davon ausgehen, dass in diesem Rahmen kein personenbezogenes Tracking allein durch die Nutzung unserer Website stattfindet.
                </p>
                <p class="body-2">
                    Google hat sich verpflichtet, einen angemessenen Datenschutz gemäss dem amerikanisch-europäischen und dem amerikanisch-schweizerischen Privacy Shield zu gewährleisten.
                </p>
                <p class="body-2">
                    Weitere Informationen finden sich in der <a href='https://policies.google.com/privacy?hl=de' target="_blank" rel="noopener" style="color: inherit;">Datenschutzerklärung von Google</a>.</p>
                <div class="headline font-weight-light">Datenschutzerklärung für Kontaktformular</div>
                <p class="body-2">
                    Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks 
                    Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
                </p>
                <div class="headline font-weight-light">Datenschutzerklärung für Newsletterdaten</div>
                <p class="body-2">
                    Wenn Sie den auf dieser WebSite angebotenen Newsletter beziehen möchten, benötigen wir von Ihnen eine E-Mail-Adresse sowie Informationen, welche uns die überprüfung 
                    gestatten, dass Sie der Inhaber der angegebenen E-Mail-Adresse sind und mit dem Empfang des Newsletters einverstanden sind. Weitere Daten werden nicht erhoben. Diese Daten verwenden wir 
                    ausschliesslich für den Versand der angeforderten Informationen und geben sie nicht an Dritte weiter.
                </p> 
                <p class="body-2">
                    Die erteilte Einwilligung zur Speicherung der Daten, der 
                    E-Mail-Adresse sowie deren Nutzung zum Versand des Newsletters können Sie jederzeit widerrufen, etwa über den "Austragen"-Link im Newsletter.
                </p>
                <div class="headline font-weight-light">Datenschutzerklärung für Kommentarfunktion auf dieser Webseite</div>
                <p class="body-2">
                    Für die Kommentarfunktion auf dieser WebSite werden neben Ihrem Kommentar auch Angaben zum Zeitpunkt der Erstellung des Kommentars, Ihre E-Mail-Adresse und, wenn Sie nicht 
                    anonym posten, der von Ihnen gewählte Nutzername gespeichert.
                </p>
                <p class="body-2">
                    <i>Speicherung der IP Adresse</i>
                </p>
                <p class="body-2">
                    Unsere Kommentarfunktion speichert die IP-Adressen der Nutzer, 
                    die Kommentare verfassen. Da wir Kommentare auf unserer Seite nicht vor der Freischaltung prüfen, benötigen wir diese Daten, um im Falle von Rechtsverletzungen wie 
                    Beleidigungen oder Propaganda gegen den Verfasser vorgehen zu können.
                </p>
                <p class="body-2">
                    <i>Abonnieren von Kommentaren</i>
                </p>
                <p class="body-2">
                    Als Nutzer der Seite können Sie nach einer Anmeldung Kommentare abonnieren. Sie erhalten eine Bestätigungsemail, um zu prüfen, ob Sie der Inhaber der angegebenen 
                    E-Mail-Adresse sind. Sie können diese Funktion jederzeit über einen Link in den Info-Mails abbestellen.</p><div class="headline font-weight-light">Datenschutzerklärung für 
                    Recht auf Auskunft, Löschung, Sperrung</div><p class="body-2">Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren 
                    Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten. Hierzu sowie zu weiteren 
                    Fragen zum Thema personenbezogene Daten können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden.
                </p>
                <div class="headline font-weight-light">Datenschutzerklärung für Widerspruch Werbe-Mails</div>
                <p class="body-2">
                    Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten zur übersendung von nicht ausdrücklich angeforderter Werbung und 
                    Informationsmaterialien wird hiermit widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten 
                    Zusendung von Werbeinformationen, etwa durch Spam-E-Mails, vor.
                </p>
                <div class="headline font-weight-light">Kostenpflichtige Leistungen</div> 
                <p class="body-2">
                    Zur Erbringung kostenpflichtiger Leistungen werden von uns zusätzliche Daten erfragt, wie z.B. Zahlungsangaben, um Ihre Bestellung resp. Ihren Auftrag 
                    ausführen zu können. Wir speichern diese Daten in unseren Systemen, bis die gesetzlichen Aufbewahrungsfristen abgelaufen sind.
                </p>
                <div class="headline font-weight-light">Google AdWords</div> 
                <p class="body-2">
                    Diese WebSite nutzt das Google Conversion-Tracking. Sind Sie über eine von Google geschaltete Anzeige auf unsere WebSite gelangt, wird von Google Adwords ein 
                    Cookie auf Ihrem Rechner gesetzt. Das Cookie für Conversion-Tracking wird gesetzt, wenn ein Nutzer auf eine von Google geschaltete Anzeige klickt. 
                    Diese Cookies verlieren nach 30 Tagen ihre Gültigkeit und dienen nicht der persönlichen Identifizierung. Besucht der Nutzer bestimmte Seiten unserer 
                    Website und das Cookie ist noch nicht abgelaufen, können wir und Google erkennen, dass der Nutzer auf die Anzeige geklickt hat und zu dieser Seite 
                    weitergeleitet wurde. Jeder Google AdWords-Kunde erhält ein anderes Cookie. Cookies können somit nicht über die Websites von AdWords-Kunden 
                    nachverfolgt werden. Die mithilfe des Conversion-Cookies eingeholten Informationen dienen dazu, Conversion-Statistiken für AdWords-Kunden zu erstellen, 
                    die sich für Conversion-Tracking entschieden haben. Die Kunden erfahren die Gesamtanzahl der Nutzer, die auf ihre Anzeige geklickt haben und zu einer 
                    mit einem Conversion-Tracking-Tag versehenen Seite weitergeleitet wurden. Sie erhalten jedoch keine Informationen, mit denen sich Nutzer persönlich identifizieren lassen.
                </p> 
                <p class="body-2">
                    Möchten Sie nicht am Tracking teilnehmen, können Sie das hierfür erforderliche Setzen eines Cookies ablehnen – etwa per Browser-Einstellung, 
                    die das automatische Setzen von Cookies generell deaktiviert oder Ihren Browser so einstellen, dass Cookies von der Domain „googleleadservices.com“ blockiert werden.
                </p> 
                <p class="body-2">
                    Bitte beachten Sie, dass Sie die Opt-out-Cookies nicht löschen dürfen, solange Sie keine Aufzeichnung von Messdaten wünschen. Haben Sie alle Ihre Cookies 
                    im Browser gelöscht, müssen Sie das jeweilige Opt-out Cookie erneut setzen.
                </p>
                <div class="headline font-weight-light">Verwendung von Google reCAPTCHA</div> 
                <p class="body-2">
                    Diese WebSite verwendet den Dienst reCAPTCHA der Google Inc. (1600 Amphitheatre Parkway, Mountain View, CA 94043, USA; „Google“). Die Abfrage dient dem Zweck der Unterscheidung, 
                    ob die Eingabe durch einen Menschen oder durch automatisierte, maschinelle Verarbeitung erfolgt. Die Abfrage schliesst den Versand der IP-Adresse und ggf. weiterer von Google 
                    für den Dienst reCAPTCHA benötigter Daten an Google ein. Zu diesem Zweck wird Ihre Eingabe an Google übermittelt und dort weiter verwendet. Ihre IP-Adresse 
                    wird von Google jedoch innerhalb von Mitgliedstaaten der Europäischen Union oder in anderen Vertragsstaaten des Abkommens über den Europäischen Wirtschaftsraum 
                    zuvor gekürzt. Nur in Ausnahmefällen wird die volle IP-Adresse an einen Server von Google in den USA übertragen und dort gekürzt. Im Auftrag des Betreibers 
                    dieser Website wird Google diese Informationen benutzen, um Ihre Nutzung dieses Dienstes auszuwerten. Die im Rahmen von reCaptcha von Ihrem Browser übermittelte IP-Adresse 
                    wird nicht mit anderen Daten von Google zusammengeführt. Ihre Daten werden dabei gegebenenfalls auch in die USA übermittelt. Für Datenübermittlungen in die 
                    USA ist ein Angemessenheitsbeschluss der Europäischen Kommission, das "Privacy Shield", vorhanden. Google nimmt am "Privacy Shield" teil und hat sich den Vorgaben unterworfen. 
                    Mit Betätigen der Abfrage willigen Sie in die Verarbeitung Ihrer Daten ein. Die Verarbeitung erfolgt auf Grundlage des Art. 6 (1) lit. a DSGVO mit Ihrer Einwilligung. 
                    Sie können Ihre Einwilligung jederzeit widerrufen, ohne dass die Rechtmässigkeit der aufgrund der Einwilligung bis zum Widerruf erfolgten Verarbeitung berührt wird.
                </p> 
                <p class="body-2">
                    Nähere Informationen zu Google reCAPTCHA sowie die dazugehörige Datenschutzerklärung finden Sie unter: 
                    <a href="https://www.google.com/privacy/ads/" target="_blank" rel="noopener">https://www.google.com/privacy/ads/</a>
                </p>
                <div class="headline font-weight-light">Datenschutzerklärung für Google Analytics</div>
                <p class="body-2">
                    Diese WebSite verwendet Google Analytics, einen Webanalysedienst von Google Inc., 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA. Zur Deaktivierung von Google Analytiscs stellt 
                    Google unter <a href="https://tools.google.com/dlpage/gaoptout?hl=de" target="_blank" style="color: inherit;">https://tools.google.com/dlpage/gaoptout?hl=de</a> ein Browser-Plug-In zur 
                    Verfügung. Google Analytics verwendet Cookies. Das sind kleine Textdateien, die es möglich machen, auf dem Endgerät des Nutzers spezifische, auf den Nutzer bezogene 
                    Informationen zu speichern. Diese ermöglichen eine Analyse der Nutzung unseres Websiteangebotes durch Google. Die durch den Cookie erfassten Informationen über die Nutzung 
                    unserer Seiten (einschliesslich Ihrer IP-Adresse) werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert. Wir weisen darauf hin, dass auf dieser 
                    Website Google Analytics um den Code „gat._anonymizeIp();“ erweitert wurde, um eine anonymisierte Erfassung von IP-Adressen (sog. IP-Masking<!--SwissAnwalt-->) zu gewährleisten. 
                    Ist die Anonymisierung aktiv, kürzt Google IP-Adressen innerhalb von Mitgliedstaaten der Europäischen Union oder in anderen Vertragsstaaten des Abkommens über den 
                    Europäischen Wirtschaftsraum, weswegen keine Rückschlüsse auf Ihre Identität möglich sind. Nur in Ausnahmefällen wird die volle IP-Adresse an einen Server 
                    von Google in den USA übertragen und dort gekürzt. Google beachtet die Datenschutzbestimmungen des „Privacy Shield“-Abkommens und ist beim „Privacy Shield“-Programm des 
                    US-Handelsministeriums registriert und nutzt die gesammelten Informationen, um die Nutzung unserer Websites auszuwerten, Berichte für uns diesbezüglich zu verfassen und andere 
                    diesbezügliche Dienstleistungen an uns zu erbringen. Mehr erfahren Sie unter 
                    <a href="https://support.google.com/analytics/answer/6004245?hl=de" target="_blank" style="color: inherit;">https://support.google.com/analytics/answer/6004245?hl=de</a>.
                </p>
                <div class="headline font-weight-light">Datenschutzerklärung für Google AdSense</div>
                <p class="body-2">
                    Diese WebSite benutzt Google AdSense, einen Dienst zum Einbinden von Werbeanzeigen von Google Inc., 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA. GoogleAdSense verwendet 
                    sog. "Cookies", Textdateien, die auf Ihrem Computer gespeichert werden und die eine Analyse der Benutzung der Website ermöglicht. Google AdSense verwendet auch so genannte Web 
                    Beacons (unsichtbare Grafiken). Durch diese Web Beacons können Informationen wie der Besucherverkehr auf diesen Seiten ausgewertet werden. Die durch Cookies und Web Beacons erzeugten 
                    Informationen über die Benutzung dieser Website (einschließlich Ihrer IP-Adresse) und Auslieferung von Werbeformaten werden an einen Server von Google in den USA übertragen 
                    und dort gespeichert. Diese Informationen können von Google an Vertragspartner von Google weiter gegeben werden. Google wird Ihre IP-Adresse jedoch nicht mit anderen von Ihnen 
                    gespeicherten Daten zusammenführen. Sie können die Installation der Cookies durch eine entsprechende Einstellung Ihrer Browser Software verhindern; wir weisen Sie jedoch 
                    darauf hin, dass Sie in diesem Fall gegebenenfalls nicht sämtliche Funktionen dieser Website voll umfänglich nutzen können. Durch die Nutzung dieser Website 
                    erklären Sie sich mit der Bearbeitung der über Sie erhobenen Daten durch Google in der zuvor beschriebenen Art und Weise und zu dem zuvor benannten Zweck einverstanden.
                </p>
                <div class="headline font-weight-light">Datenschutzerklärung für die Nutzung von Google Web Fonts</div>
                <p class="body-2">
                    Diese WebSite nutzt zur einheitlichen Darstellung von Schriftarten so genannte Web Fonts, die von Google bereitgestellt werden. Beim Aufruf einer Seite lädt Ihr Browser die 
                    benötigten Web Fonts in ihren Browsercache, um Texte und Schriftarten korrekt anzuzeigen. Wenn Ihr Browser Web Fonts nicht unterstützt, wird eine Standardschrift von Ihrem Computer genutzt.
                </p>
                <p class="body-2">
                    Weitere Informationen zu Google Web Fonts finden Sie unter <a href="https://developers.google.com/fonts/faq" target="_blank" style="color: inherit;">https://developers.google.com/fonts/faq</a> 
                    und in der Datenschutzerklärung von Google: <a href="https://www.google.com/policies/privacy/" target="_blank" style="color: inherit;">https://www.google.com/policies/privacy/</a>
                </p>
                <div class="headline font-weight-light">Google Tag Manager</div> 
                <p class="body-2">
                    Google Tag Manager ist eine Lösung, mit der wir sog. Website-Tags über eine Oberfläche verwalten können und so z.B. Google Analytics sowie andere Google-Marketing-Dienste 
                    in unser Onlineangebot einbinden können. Der Tag Manager selbst, welcher die Tags implementiert, verarbeitet keine personenbezogenen Daten der Nutzer. Im Hinblick auf die Verarbeitung der 
                    personenbezogenen Daten der Nutzer wird auf die folgenden Angaben zu den Google-Diensten verwiesen. 
                    Nutzungsrichtlinien: <a href="https://www.google.com/intl/de/tagmanager/use-policy.html" target="_blank" rel="noopener">https://www.google.com/intl/de/tagmanager/use-policy.html</a>.
                </p>
                <div class="headline font-weight-light">Datenschutzerklärung für die Nutzung von Hotjar</div> 
                <p class="body-2">
                    Diese WebSite benutzt den Service von Hotjar zur Verbesserung der Benutzerfreundlichkeit. Die Hotjar Ltd. Hotjar Ltd. ist ein europäisches Unternehmen mit Sitz in Malta 
                    (Hotjar Ltd, Level 2, St Julians Business Centre, 3, Elia Zammit Street, St Julians STJ 1000, Malta, Europe). Es können Mausklicks sowie Maus- und Scroll-Bewegungen aufgezeichnet 
                    werden. Ebenso können auf dieser Internetseite durchgeführte Tastatureingaben aufgezeichnet werden. Personifizierte Informationen werden dabei nicht aufgenommen. 
                    Hotjar verwendet zur Erhebung und übertragung Ihrer Daten einen Tracking-Code. Sobald Sie unsere Website besuchen, erhebt der Hotjar Tracking-Code automatisch die auf Ihrer 
                    Aktivität beruhenden Daten und speichert Sie auf den Hotjar Servern (Standort Irland) ab. Zudem erheben die durch die Website auf Ihrem Computer oder Ihrem Endendgerät 
                    platzierten Cookies ebenfalls Daten. Für weitere Informationen, wie Hotjar arbeitet, besuchen Sie diese Seite 
                    <a href="https://www.hotjar.com/privacy" target="_blank" rel="noopener">https://www.hotjar.com/privacy</a>.
                </p> 
                <p class="body-2">
                    Möchten Sie der Erhebung der Daten durch Hotjar widersprechen (Opt-Out), klicken Sie bitte hier: <a href="https://www.hotjar.com/opt-out" target="_blank" rel="noopener">https://www.hotjar.com/opt-out</a>.
                </p>
                <div class="headline font-weight-light">Datenschutzerklärung für Facebook</div>
                <p class="body-2">
                    Diese WebSite verwendet Funktionen von Facebook Inc., 1601 S. California Ave, Palo Alto, CA 94304, USA . Bei Aufruf unserer Seiten mit Facebook-Plug-Ins wird eine Verbindung zwischen Ihrem 
                    Browser und den Servern von Facebook aufgebaut. Dabei werden bereits Daten an Facebook übertragen. Besitzen Sie einen Facebook-Account, können diese Daten damit verknüpft werden. 
                    Wenn Sie keine Zuordnung dieser Daten zu Ihrem Facebook-Account wünschen, loggen Sie sich bitte vor dem Besuch unserer Seite bei Facebook aus. Interaktionen, insbesondere das Nutzen einer 
                    Kommentarfunktion oder das Anklicken eines „Like“- oder „Teilen“-Buttons werden ebenfalls an Facebook weitergegeben. Mehr erfahren Sie unter 
                    <a href="https://de-de.facebook.com/about/privacy" target="_blank" style="color: inherit;">https://de-de.facebook.com/about/privacy</a>.
                </p>
                <div class="headline font-weight-light">Datenschutzerklärung für Twitter</div>
                <p class="body-2">
                    Diese WebSite verwendet Funktionen von Twitter, Inc., 1355 Market St, Suite 900, San Francisco, CA 94103, USA. Bei Aufruf unserer Seiten mit Twitter-Plug-Ins wird eine Verbindung zwischen 
                    Ihrem Browser und den Servern von Twitter aufgebaut. Dabei werden bereits Daten an Twitter übertragen. Besitzen Sie einen Twitter-Account, können diese Daten damit verknüpft 
                    werden. Wenn Sie keine Zuordnung dieser Daten zu Ihrem Twitter-Account wünschen, loggen Sie sich bitte vor dem Besuch unserer Seite bei Twitter aus. Interaktionen, insbesondere das Anklicken 
                    eines „Re-Tweet“-Buttons werden ebenfalls an Twitter weitergegeben. Mehr erfahren Sie unter <a href="https://twitter.com/privacy" target="_blank" style="color: inherit;">https://twitter.com/privacy</a>.
                </p>
                <div class="headline font-weight-light">Datenschutzerklärung für Instagram</div>
                <p class="body-2">
                    Auf unseren Seiten sind Funktionen des Dienstes Instagram eingebunden. Diese Funktionen werden angeboten durch die Instagram Inc., 1601 Willow Road, Menlo Park, CA, 94025, USA integriert. 
                    Wenn Sie in Ihrem Instagram-Account eingeloggt sind können Sie durch Anklicken des Instagram-Buttons die Inhalte unserer Seiten mit Ihrem Instagram-Profil verlinken. Dadurch kann Instagram 
                    den Besuch unserer Seiten Ihrem Benutzerkonto zuordnen. Wir weisen darauf hin, dass wir als Anbieter der Seiten keine Kenntnis vom Inhalt der übermittelten Daten sowie deren Nutzung durch Instagram erhalten.
                </p>
                <p class="body-2">
                    Weitere Informationen hierzu finden Sie in der Datenschutzerklärung von Instagram: <a href="https://instagram.com/about/legal/privacy/" target="_blank" style="color: inherit;">http://instagram.com/about/legal/privacy/</a>
                </p>
                <div class="headline font-weight-light">Externe Zahlungsdienstleister</div> 
                <p class="body-2">
                    Diese WebSite setzt externe Zahlungsdienstleister ein, über deren Plattformen die Nutzer und wir Zahlungstransaktionen vornehmen können. Zum Beispiel über
                </p>
                <ul>
                    <li>PostFinance (https://www.postfinance.ch/de/detail/rechtliches-barrierefreiheit.html)</li>
                    <li>Visa (https://www.visa.de/nutzungsbedingungen/visa-privacy-center.html)</li>
                    <li>Mastercard (https://www.mastercard.ch/de-ch/datenschutz.html)</li>
                    <li>American Express (https://www.americanexpress.com/de/content/privacy-policy-statement.html)</li>
                    <li>Paypal (https://www.paypal.com/de/webapps/mpp/ua/privacy-full)</li>
                    <li>Bexio AG (https://www.bexio.com/de-CH/datenschutz)</li>
                    <li>Payrexx AG (https://www.payrexx.ch/site/assets/files/2592/datenschutzerklaerung.pdf)</li>
                    <li>Apple Pay (https://support.apple.com/de-ch/ht203027)</li>
                    <li>Stripe (https://stripe.com/ch/privacy)</li>
                    <li>Klarna (https://www.klarna.com/de/datenschutz/)</li>
                    <li>Skrill (https://www.skrill.com/de/fusszeile/datenschutzrichtlinie/)</li>
                    <li>Giropay (https://www.giropay.de/rechtliches/datenschutz-agb/) etc.</li>
                </ul> 
                <p class="body-2">
                    Im Rahmen der Erfüllung von Verträgen setzen wir die Zahlungsdienstleister auf Grundlage der schweizerischen Datenschutzverordnung sowie und soweit nötig, 
                    des Art. 6 Abs. 1 lit. b. EU-DSGVO ein. Im übrigen setzen wir externe Zahlungsdienstleister auf Grundlage unserer berechtigten Interessen gem. schweizerischer 
                    Datenschutzverordnung sowie und soweit nötig, gem. Art. 6 Abs. 1 lit. f. EU-DSGVO ein, um unseren Nutzern effektive und sichere Zahlungsmöglichkeit zu bieten.
                </p> 
                <p class="body-2">
                    Zu den durch die Zahlungsdienstleister verarbeiteten Daten gehören Bestandsdaten, wie z.B. der Name und die Adresse, Bankdaten, wie u.a. Kontonummern oder Kreditkartennummern, 
                    Passwörter, TANs und Prüfsummen sowie die Vertrags-, Summen und empfängerbezogenen Angaben. Die Angaben sind erforderlich, um die Transaktionen durchzuführen. 
                    Die eingegebenen Daten werden jedoch nur durch die Zahlungsdienstleister verarbeitet und bei diesen gespeichert. Wir als Betreiber erhalten keinerlei Informationen zu (Bank-) 
                    Konto oder Kreditkarte, sondern lediglich Informationen zur Bestätigung (Annahme) oder Ablehnung der Zahlung. Unter Umständen werden die Daten seitens der Zahlungsdienstleister 
                    an Wirtschaftsauskunfteien übermittelt. Diese übermittlung bezweckt die Identitäts- und Bonitätsprüfung. Hierzu verweisen wir auf die AGB und Datenschutzhinweise der Zahlungsdienstleister.
                </p> 
                <p class="body-2">
                    Für die Zahlungsgeschäfte gelten die Geschäftsbedingungen und die Datenschutzhinweise der jeweiligen Zahlungsdienstleister, welche innerhalb der jeweiligen Website, bzw. Transaktionsapplikationen 
                    abrufbar sind. Wir verweisen auf diese ebenfalls zwecks weiterer Informationen und Geltendmachung von Widerrufs-, Auskunfts- und anderen Betroffenenrechten.
                </p>
                <div class="headline font-weight-light">Datenschutzerklärung für YouTube</div>
                <p class="body-2">
                    Diese WebSite nutzt Plugins der von Google betriebenen Seite YouTube. Betreiber der Seiten ist die YouTube, LLC, 901 Cherry Ave., San Bruno, CA 94066, USA. Wenn Sie eine unserer mit einem YouTube-Plugin ausgestatteten 
                    Seiten besuchen, wird eine Verbindung zu den Servern von YouTube hergestellt. Dabei wird dem Youtube-Server mitgeteilt, welche unserer Seiten Sie besucht haben.
                </p> 
                <p class="body-2">
                    Wenn Sie in Ihrem YouTube-Account eingeloggt 
                    sind ermöglichen Sie YouTube, Ihr Surfverhalten direkt Ihrem persönlichen Profil zuzuordnen. Dies können Sie verhindern, indem Sie sich aus Ihrem YouTube-Account ausloggen.
                </p>
                <p class="body-2">
                    Weitere Informationen zum Umgang von Nutzerdaten finden Sie in der Datenschutzerklärung von YouTube unter: 
                    <a href="https://www.google.de/intl/de/policies/privacy" target="_blank" style="color: inherit;">https://www.google.de/intl/de/policies/privacy</a>
                </p>
                <div class="headline font-weight-light">Bestellabwicklung im Online-Shop mit Kundenkonto</div> 
                <p class="body-2">
                    Wir verarbeiten die Daten unserer Kunden gem. den datenschutzrechtlichen Bestimmungen des Bundes (Datenschutzgesetz, DSG) und der EU-DSGVO, im Rahmen der Bestellvorgänge in unserem Onlineshop, 
                    um ihnen die Auswahl und die Bestellung der gewählten Produkte und Leistungen, sowie deren Bezahlung und Zustellung, bzw. Ausführung zu ermöglichen.
                </p> 
                <p class="body-2">
                    Zu den verarbeiteten Daten gehören Stammdaten (Bestandsdaten), Kommunikationsdaten, Vertragsdaten, Zahlungsdaten und zu den von der Verarbeitung betroffenen Personen gehören unsere Kunden, Interessenten und sonstige 
                    Geschäftspartner. Die Verarbeitung erfolgt zum Zweck der Erbringung von Vertragsleistungen im Rahmen des Betriebs eines Onlineshops, Abrechnung, Auslieferung und der Kundenservices. Hierbei 
                    setzen wir Session Cookies, z.B. für die Speicherung des Warenkorb-Inhalts und permanente Cookies, z.B. für die Speicherung des Login-Status ein.
                </p> 
                <p class="body-2">
                    Die Verarbeitung erfolgt auf Grundlage des Art. 6 Abs. 1 lit. b (Durchführung Bestellvorgänge) und c (Gesetzlich erforderliche Archivierung) DSGVO. Dabei sind die als erforderlich gekennzeichneten Angaben zur 
                    Begründung und Erfüllung des Vertrages erforderlich. Die Daten offenbaren wir gegenüber Dritten nur im Rahmen der Auslieferung, Zahlung oder im Rahmen der gesetzlichen Erlaubnisse 
                    und Pflichten. Die Daten werden in Drittländern nur dann verarbeitet, wenn dies zur Vertragserfüllung erforderlich ist (z.B. auf Kundenwunsch bei Auslieferung oder Zahlung).
                </p> 
                <p class="body-2">
                    Nutzer können optional ein Nutzerkonto anlegen, indem sie insbesondere ihre Bestellungen einsehen können. Im Rahmen der Registrierung, werden die erforderlichen Pflichtangaben den Nutzern mitgeteilt. 
                    Die Nutzerkonten sind nicht öffentlich und können von Suchmaschinen, z.B. Google, nicht indexiert werden. Wenn Nutzer ihr Nutzerkonto gekündigt haben, werden deren Daten im Hinblick auf das 
                    Nutzerkonto gelöscht, vorbehaltlich deren Aufbewahrung ist aus handels- oder steuerrechtlichen Gründen entspr. Art. 6 Abs. 1 lit. c DSGVO notwendig. Angaben im Kundenkonto verbleiben bis zu deren 
                    Löschung mit anschliessender Archivierung im Fall einer rechtlichen Verpflichtung. Es obliegt den Nutzern, ihre Daten bei erfolgter Kündigung vor dem Vertragsende zu sichern.
                </p> 
                <p class="body-2">
                    Im Rahmen der Registrierung und erneuter Anmeldungen sowie Inanspruchnahme unserer Onlinedienste, speichern wir die IP-Adresse und den Zeitpunkt der jeweiligen Nutzerhandlung. Die Speicherung erfolgt auf 
                    Grundlage unserer berechtigten Interessen, als auch der Nutzer an Schutz vor Missbrauch und sonstiger unbefugter Nutzung. Eine Weitergabe dieser Daten an Dritte erfolgt grundsätzlich nicht, ausser 
                    sie ist zur Verfolgung unserer Ansprüche erforderlich oder es besteht hierzu eine gesetzliche Verpflichtung gem. Art. 6 Abs. 1 lit. c DSGVO.
                </p> 
                <p class="body-2">
                    Die Löschung erfolgt nach Ablauf gesetzlicher Gewährleistungs- und vergleichbarer Pflichten, die Erforderlichkeit der Aufbewahrung der Daten wird in unregelmässigen 
                    Abständen überprüft. Im Fall der gesetzlichen Archivierungspflichten erfolgt die Löschung nach deren Ablauf.
                </p>
                <div class="headline font-weight-light">Agenturdienstleistungen</div> 
                <p class="body-2">
                    Wir verarbeiten die Daten unserer Kunden gem. den datenschutzrechtlichen Bestimmungen des Bundes (Datenschutzgesetz, DSG) und der EU-DSGVO im Rahmen unserer vertraglichen Leistungen.
                </p> 
                <p class="body-2">
                    Hierbei verarbeiten wir Bestandsdaten (z.B., Kundenstammdaten, wie Namen oder Adressen), Kontaktdaten (z.B. E-Mail, Telefonnummern), Inhaltsdaten (z.B. Texteingaben etc.), Vertragsdaten (z.B. Vertragsgegenstand, Laufzeit), 
                    Zahlungsdaten (z.B. Bankverbindung, Zahlungshistorie), Nutzungs- und Metadaten (z.B. im Rahmen der Auswertung und Erfolgsmessung von Marketingmassnahmen). Zu den Betroffenen gehören unsere Kunden, Interessenten 
                    sowie deren Kunden, Nutzer, Websitebesucher oder Mitarbeiter sowie Dritte. Der Zweck der Verarbeitung besteht in der Erbringung von Vertragsleistungen, Abrechnung und unserem Kundenservice. Die Rechtsgrundlagen der 
                    Verarbeitung ergeben sich aus Art. 6 Abs. 1 lit. b DSGVO (vertragliche Leistungen), Art. 6 Abs. 1 lit. f DSGVO (Analyse, Statistik, Optimierung, Sicherheitsmassnahmen). Wir verarbeiten Daten, die zur Begründung 
                    und Erfüllung der vertraglichen Leistungen erforderlich sind und weisen auf die Erforderlichkeit ihrer Angabe hin. Eine Offenlegung an Externe erfolgt nur, wenn sie im Rahmen eines Auftrags erforderlich ist. 
                    Bei der Verarbeitung der uns im Rahmen eines Auftrags überlassenen Daten handeln wir entsprechend den Weisungen der Auftraggeber sowie der gesetzlichen Vorgaben einer Auftragsverarbeitung gem. Art. 28 DSGVO 
                    und verarbeiten die Daten zu keinen anderen, als den auftragsgemässen Zwecken.
                </p>
                <p class="body-2">
                    Wir löschen die Daten nach Ablauf gesetzlicher Gewährleistungs- und vergleichbarer Pflichten. Die Erforderlichkeit 
                    der Aufbewahrung der Daten wird in unregelmässigen Abständen überprüft. Im Fall der gesetzlichen Archivierungspflichten erfolgt die Löschung nach deren Ablauf. Im Fall von Daten, die uns 
                    gegenüber im Rahmen eines Auftrags durch den Auftraggeber offengelegt wurden, löschen wir die Daten entsprechend den Vorgaben des Auftrags, grundsätzlich nach Ende des Auftrags.
                <div class="headline font-weight-light">Maklerleistungen</div> 
                <p class="body-2">
                    Wir verarbeiten die Daten unserer Kunden, Klienten und Interessenten (einheitlich bezeichnet als «Kunden») gem. den datenschutzrechtlichen Bestimmungen des Bundes (Datenschutzgesetz, DSG) und der EU-DSGVO 
                    entsprechend Art. 6 Abs. 1 lit. b. DSGVO, um ihnen gegenüber unsere vertraglichen oder vorvertraglichen Leistungen zu erbringen. Die hierbei verarbeiteten Daten, die Art, der Umfang und der Zweck und die 
                    Erforderlichkeit ihrer Verarbeitung bestimmen sich nach dem zugrundeliegenden Auftrag. Dazu gehören grundsätzlich Bestands- und Stammdaten der Kunden (Name, Adresse, etc.), als auch die Kontaktdaten 
                    (E-Mailadresse, Telefon, etc.), die Vertragsdaten (Inhalt der Beauftragung, Entgelte, Laufzeiten, Angaben zu den vermittelten Unternehmen/ Versicherern/ Leistungen) und Zahlungsdaten (Provisionen, Zahlungshistorie, etc.). 
                    Wir können ferner die Angaben zu den Eigenschaften und Umständen von Personen oder ihnen gehörenden Sachen verarbeiten, wenn dies zum Gegenstand unseres Auftrags gehört. Dies können z.B. Angaben 
                    zu persönlichen Lebensumständen, mobilen oder immobilen Sachgütern sein.
                </p> 
                <p class="body-2">
                    Im Rahmen unserer Beauftragung kann es auch erforderlich sein, dass wir besondere Kategorien von Daten gem. Art. 9 Abs. 1 
                    DSGVO, hier insbesondere Angaben zur Gesundheit einer Person verarbeiten. Hierzu holen wir, sofern erforderlich, gem. Art. 6 Abs. 1 lit a., Art. 7, Art. 9 Abs. 2 lit. a DSGVO eine ausdrückliche Einwilligung der Kunden ein.
                </p> 
                <p class="body-2">
                    Sofern für die Vertragserfüllung oder gesetzlich erforderlich, offenbaren oder übermitteln wir die Daten der Kunden im Rahmen von Deckungsanfragen, Abschlüssen und Abwicklungen von Verträgen, Daten an 
                    Anbieter der vermittelten Leistungen/ Objekte, Versicherer, Rückversicherer, Maklerpools, technische Dienstleister, sonstige Dienstleister, wie z.B. kooperierende Verbände, sowie Finanzdienstleister, Kreditinstitute 
                    und Kapitalanlagegesellschaften sowie Sozialversicherungsträger, Steuerbehörden, Steuerberater, Rechtsberater, Wirtschaftsprüfer, Versicherungs-Ombudsmänner und die Schweizerische Finanzmarkt-Aufsicht (FINMA) 
                    oder Bundesanstalt für Finanzdienstleistungsaufsicht (BaFin). Ferner können wir Unterauftragnehmer beauftragen, wie z.B. Untervermittler. Wir holen eine Einwilligung der Kunden ein, sofern diese zur Offenbarung/ 
                    Übermittlung eine Einwilligung der Kunden erforderlich ist (was z.B. im Fall von besonderen Kategorien von Daten gem. Art. 9 DSGVO der Fall sein kann).
                </p> 
                <p class="body-2">
                    Die Löschung der Daten erfolgt nach Ablauf gesetzlicher Gewährleistungs- und vergleichbarer Pflichten, wobei die Erforderlichkeit der Aufbewahrung der Daten in unregelmässigen Abständen überprüft wird. 
                    Im übrigen gelten die gesetzlichen Aufbewahrungspflichten. Im Fall der gesetzlichen Archivierungspflichten erfolgt die Löschung nach deren Ablauf.
                </p> 
                <div class="headline font-weight-light">Vertragliche Leistungen</div> 
                <p class="body-2">
                    Wir verarbeiten die Daten unserer Vertragspartner und Interessenten sowie anderer Auftraggeber, Kunden, Mandanten, Klienten oder Vertragspartner (einheitlich bezeichnet als «Vertragspartner») gem. den datenschutzrechtlichen 
                    Bestimmungen des Bundes (Datenschutzgesetz, DSG) und der EU-DSGVO entsprechend Art. 6 Abs. 1 lit. b. DSGVO, um ihnen gegenüber unsere vertraglichen oder vorvertraglichen Leistungen zu erbringen. Die hierbei verarbeiteten Daten, 
                    die Art, der Umfang und der Zweck und die Erforderlichkeit ihrer Verarbeitung, bestimmen sich nach dem zugrundeliegenden Vertragsverhältnis.
                </p> 
                <p class="body-2">
                    Zu den verarbeiteten Daten gehören die Stammdaten unserer Vertragspartner (z.B. Namen und Adressen), Kontaktdaten (z.B. E-Mailadressen und Telefonnummern) sowie Vertragsdaten (z.B. in Anspruch genommene Leistungen, Vertragsinhalte, 
                    vertragliche Kommunikation, Namen von Kontaktpersonen) und Zahlungsdaten (z.B. Bankverbindungen, Zahlungshistorie).
                </p> 
                <p class="body-2">
                    Besondere Kategorien personenbezogener Daten verarbeiten wir grundsätzlich nicht, ausser wenn diese Bestandteile einer beauftragten oder vertragsgemässen Verarbeitung sind.
                </p> 
                <p class="body-2">
                    Wir verarbeiten Daten, die zur Begründung und Erfüllung der vertraglichen Leistungen erforderlich sind und weisen auf die Erforderlichkeit ihrer Angabe, sofern diese für die Vertragspartner nicht evident ist, hin. 
                    Eine Offenlegung an externe Personen oder Unternehmen erfolgt nur, wenn sie im Rahmen eines Vertrags erforderlich ist. Bei der Verarbeitung der uns im Rahmen eines Auftrags überlassenen Daten, handeln wir entsprechend den 
                    Weisungen der Auftraggeber sowie der gesetzlichen Vorgaben.
                </p> 
                <p class="body-2">
                    Im Rahmen der Inanspruchnahme unserer Onlinedienste, können wir die IP-Adresse und den Zeitpunkt der jeweiligen Nutzerhandlung speichern. Die Speicherung erfolgt 
                    auf Grundlage unserer berechtigten Interessen, als auch der Interessen der Nutzer am Schutz vor Missbrauch und sonstiger unbefugter Nutzung. Eine Weitergabe dieser Daten an Dritte erfolgt grundsätzlich nicht, ausser sie 
                    ist zur Verfolgung unserer Ansprüche gem. Art. 6 Abs. 1 lit. f. DSGVO erforderlich oder es besteht hierzu eine gesetzliche Verpflichtung gem. Art. 6 Abs. 1 lit. c. DSGVO.
                </p> 
                <p class="body-2">
                    Die Löschung der Daten erfolgt, wenn 
                    die Daten zur Erfüllung vertraglicher oder gesetzlicher Fürsorgepflichten sowie für den Umgang mit etwaigen Gewährleistungs- und vergleichbaren Pflichten nicht mehr erforderlich sind, wobei die Erforderlichkeit 
                    der Aufbewahrung der Daten in unregelmässigen Abständen überprüft wird. Im übrigen gelten die gesetzlichen Aufbewahrungspflichten.
                </p>
                <div class="headline font-weight-light">Urheberrechte</div> 
                <p class="body-2">
                    Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder anderen Dateien auf der Website, gehören ausschliesslich dem Betreiber dieser Website oder den speziell genannten Rechteinhabern. Für die Reproduktion von 
                    sämtlichen Dateien, ist die schriftliche Zustimmung des Urheberrechtsträgers im Voraus einzuholen.</p><p class="body-2">Wer ohne Einwilligung des jeweiligen Rechteinhabers eine Urheberrechtsverletzung begeht, kann sich strafbar und allenfalls 
                    schadenersatzpflichtig machen.
                </p>
                <div class="headline font-weight-light">Allgemeiner Haftungsausschluss</div> 
                <p class="body-2">
                    Alle Angaben unseres Internetangebotes wurden sorgfältig geprüft. Wir bemühen uns, unser Informationsangebot aktuell, inhaltlich richtig und vollständig anzubieten. Trotzdem kann das Auftreten von Fehlern nicht 
                    völlig ausgeschlossen werden, womit wir keine Garantie für Vollständigkeit, Richtigkeit und Aktualität von Informationen auch journalistisch-redaktioneller Art übernehmen können. Haftungsansprüche 
                    aus Schäden materieller oder ideeller Art, die durch die Nutzung der angebotenen Informationen verursacht wurden, sind ausgeschlossen, sofern kein nachweislich vorsätzliches oder grob fahrlässiges Verschulden vorliegt.
                </p>
                <p class="body-2">
                    Der Herausgeber kann nach eigenem Ermessen und ohne Ankündigung Texte verändern oder löschen und ist nicht verpflichtet, Inhalte dieser Website zu aktualisieren. Die Benutzung bzw. der Zugang zu dieser Website geschieht 
                    auf eigene Gefahr des Besuchers. Der Herausgeber, seine Auftraggeber oder Partner sind nicht verantwortlich für Schäden, wie direkte, indirekte, zufällige, vorab konkret zu bestimmende oder Folgeschäden, die angeblich 
                    durch den Besuch dieser Website entstanden sind und übernehmen hierfür folglich keine Haftung.
                </p>
                <p class="body-2">
                    Der Herausgeber übernimmt ebenfalls keine Verantwortung und Haftung für die Inhalte und die Verfügbarkeit von 
                    Webseiten Dritter, die über externe Links dieser Webseite erreichbar sind. Für den Inhalt der verlinkten Seiten sind ausschliesslich deren Betreiber verantwortlich. Der Herausgeber distanziert sich damit ausdrücklich von 
                    allen Inhalten Dritter, die möglicherweise straf- oder haftungsrechtlich relevant sind oder gegen die guten Sitten verstossen.
                </p>
                <div class="headline font-weight-light">änderungen</div>
                <p class="body-2">
                    Wir können diese Datenschutzerklärung jederzeit ohne 
                    Vorankündigung anpassen. Es gilt die jeweils aktuelle, auf unserer Website publizierte Fassung. Soweit die Datenschutzerklärung Teil einer Vereinbarung mit Ihnen ist, werden wir Sie im Falle einer Aktualisierung über 
                    die änderung per E-Mail oder auf andere geeignete Weise informieren.
                </p>
                <div class="headline font-weight-light">Fragen an den Datenschutzbeauftragten</div> 
                <p class="body-2">
                    Wenn Sie Fragen zum Datenschutz haben, schreiben Sie uns bitte eine E-Mail oder wenden Sie sich direkt an die für den Datenschutz zu Beginn der Datenschutzerklärung aufgeführten, 
                    verantwortlichen Person in unserer Organisation.
                </p>
                <p class="caption">
                    Basel, 09.09.2019<br/>
                    Quelle: <a href="https://www.swissanwalt.ch" target="_blank" rel="noopener">SwissAnwalt</a>
                </p>
                `
            },
            de: {
                title: 'Datenschutzerklärung',
                contact: 'Kontakt',
                langNotice: 'Übersetz mit'
            }
        }
    }

}
</script>
