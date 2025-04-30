document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const formaCards = document.querySelectorAll('.forma-card');
    const paramGroups = document.querySelectorAll('.parameter-group');
    const parametryToggle = document.getElementById('parametry-toggle');
    const parametrySection = document.querySelector('.parametry-esencjalne');
    const currentFormaDisplay = document.getElementById('current-forma');
    const previewButton = document.getElementById('preview-button');
    const transmuteButton = document.getElementById('transmute-button');
    const previewModal = document.getElementById('preview-modal');
    const closeButton = document.querySelector('.close-button');
    const promptPreview = document.getElementById('prompt-preview');
    const copyPromptButton = document.getElementById('copy-prompt');
    const problemInput = document.getElementById('problem-input');
    const recursionCircles = document.querySelectorAll('.recursion-circle');
    const rangeInputs = document.querySelectorAll('input[type="range"]');
    
    // Elementy drzewa życia
    const drzewoToggle = document.getElementById('drzewo-toggle');
    const drzewoSection = document.querySelector('.drzewo-zycia');
    const sefirotCircles = document.querySelectorAll('.sefira-circle');
    const fullPathBtn = document.getElementById('full-path-btn');
    const clearPathBtn = document.getElementById('clear-path-btn');
    const sefirotCountDisplay = document.getElementById('sefirot-count');
    const currentFazaDisplay = document.getElementById('current-faza');
    const legendItems = document.querySelectorAll('.legend-item');
    
    // Elementy faz alchemicznych
    const fazyElements = document.querySelectorAll('.faza');
    
    // Elementy szablonów
    const szablonNazwaInput = document.getElementById('szablon-nazwa');
    const zapiszSzablonBtn = document.getElementById('zapisz-szablon-btn');
    const szablonSelect = document.getElementById('szablon-select');
    const wczytajSzablonBtn = document.getElementById('wczytaj-szablon-btn');
    const usunSzablonBtn = document.getElementById('usun-szablon-btn');
    
    // Elementy predefiniowanych ścieżek
    const sciezkiCards = document.querySelectorAll('.sciezka-card');
    
    // Elementy powiadomień
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notification-message');
    
    // Stan aplikacji
    let activeSefirot = [];
    let activeFaza = 'nigredo';
    let activeForma = 'separatio';
    let recursionLevel = '3';
    
    // Ładowanie zapisanych szablonów przy starcie
    loadTemplates();
    
    // Initialize range input values
    rangeInputs.forEach(input => {
        const valueDisplay = input.nextElementSibling;
        valueDisplay.textContent = `${input.value}/10`;
        
        input.addEventListener('input', function() {
            valueDisplay.textContent = `${this.value}/10`;
        });
    });
    
    // Toggle parameters section
    parametryToggle.addEventListener('click', function() {
        parametrySection.classList.toggle('collapsed');
    });
    
    // Toggle Drzewo Życia section
    drzewoToggle.addEventListener('click', function() {
        drzewoSection.classList.toggle('collapsed');
    });
    
    // Change active forma card
    formaCards.forEach(card => {
        card.addEventListener('click', function() {
            // Update active card
            formaCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            // Update parameter groups
            activeForma = this.getAttribute('data-forma');
            paramGroups.forEach(group => {
                group.classList.remove('active');
                if (group.getAttribute('data-forma') === activeForma) {
                    group.classList.add('active');
                }
            });
            
            // Update status display
            updateFormaDisplay();
        });
    });
    
    // Update forma display
    function updateFormaDisplay() {
        let formaName, formaType;
        switch (activeForma) {
            case 'separatio':
                formaName = 'Separatio';
                formaType = 'Analityczna';
                break;
            case 'coagulatio':
                formaName = 'Coagulatio';
                formaType = 'Pragmatyczna';
                break;
            case 'coniunctio':
                formaName = 'Coniunctio';
                formaType = 'Dialektyczna';
                break;
        }
        currentFormaDisplay.textContent = `Forma: ${formaName} (${formaType})`;
    }
    
    // Obsługa kliknięć na sefiroty
    sefirotCircles.forEach(circle => {
        circle.addEventListener('click', function() {
            const sefira = this.getAttribute('data-sefira');
            
            if (this.classList.contains('active')) {
                // Dezaktywacja
                this.classList.remove('active');
                activeSefirot = activeSefirot.filter(s => s !== sefira);
            } else {
                // Aktywacja
                this.classList.add('active');
                activeSefirot.push(sefira);
            }
            
            // Aktualizacja licznika
            sefirotCountDisplay.textContent = activeSefirot.length.toString();
        });
    });
    
    // Obsługa kliknięć na elementy legendy (dodatkowy sposób wyboru sefirot)
    legendItems.forEach(item => {
        item.addEventListener('click', function() {
            const sefira = this.getAttribute('data-sefira');
            const sefirotCircle = document.querySelector(`.sefira-circle[data-sefira="${sefira}"]`);
            
            if (sefirotCircle) {
                // Symuluj kliknięcie na odpowiedni krąg
                sefirotCircle.click();
            }
        });
    });
    
    // Przyciski pełnej ścieżki i wyczyszczenia
    fullPathBtn.addEventListener('click', function() {
        activeSefirot = [];
        sefirotCircles.forEach(circle => {
            circle.classList.add('active');
            const sefira = circle.getAttribute('data-sefira');
            activeSefirot.push(sefira);
        });
        sefirotCountDisplay.textContent = activeSefirot.length.toString();
    });
    
    clearPathBtn.addEventListener('click', function() {
        sefirotCircles.forEach(circle => {
            circle.classList.remove('active');
        });
        activeSefirot = [];
        sefirotCountDisplay.textContent = '0';
    });
    
    // Obsługa faz alchemicznych
    fazyElements.forEach(faza => {
        faza.addEventListener('click', function() {
            fazyElements.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            activeFaza = this.getAttribute('data-faza');
            
            // Aktualizacja wyświetlania
            updateFazaDisplay();
        });
    });
    
    // Aktualizacja wyświetlania fazy
    function updateFazaDisplay() {
        let fazaName;
        switch (activeFaza) {
            case 'nigredo': fazaName = 'Nigredo'; break;
            case 'albedo': fazaName = 'Albedo'; break;
            case 'citrinitas': fazaName = 'Citrinitas'; break;
            case 'rubedo': fazaName = 'Rubedo'; break;
        }
        currentFazaDisplay.textContent = `Faza: ${fazaName}`;
    }
    
    // Recursion level selector
    recursionCircles.forEach(circle => {
        circle.addEventListener('click', function() {
            recursionCircles.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            recursionLevel = this.getAttribute('data-level');
        });
    });
    
    // Obsługa predefiniowanych ścieżek
    sciezkiCards.forEach(card => {
        card.addEventListener('click', function() {
            const sciezka = this.getAttribute('data-sciezka');
            
            // Resetowanie dotychczasowych wyborów
            clearCurrentConfig();
            
            // Ładowanie predefiniowanej ścieżki
            switch (sciezka) {
                case 'analiza-systemowa':
                    setForma('separatio');
                    setFaza('nigredo');
                    setSefirot(['binah', 'chesed', 'gevurah', 'tiferet']);
                    document.querySelector('#separatio-depth').value = 8;
                    document.querySelector('#separatio-depth').nextElementSibling.textContent = '8/10';
                    document.querySelectorAll('input[name="perspective"]').forEach(cb => {
                        cb.checked = ['Ontologiczna', 'Epistemologiczna', 'Pragmatyczna'].includes(cb.value);
                    });
                    break;
                    
                case 'transformacja-praktyczna':
                    setForma('coagulatio');
                    setFaza('rubedo');
                    setSefirot(['tiferet', 'netzach', 'hod', 'malkuth']);
                    document.querySelector('input[name="temporal-scope"][value="Krótkoterminowy"]').checked = true;
                    document.querySelector('#coagulatio-level').value = 'Organizacyjny';
                    break;
                    
                case 'synteza-dialektyczna':
                    setForma('coniunctio');
                    setFaza('citrinitas');
                    setSefirot(['keter', 'chokmah', 'binah', 'tiferet']);
                    document.querySelector('#coniunctio-tension').value = 7;
                    document.querySelector('#coniunctio-tension').nextElementSibling.textContent = '7/10';
                    document.querySelectorAll('input[name="synthesis"]').forEach(cb => {
                        cb.checked = ['Heglowska', 'Kontrapunktowa'].includes(cb.value);
                    });
                    break;
                    
                case 'oczyszczenie-konceptualne':
                    setForma('separatio');
                    setFaza('albedo');
                    setSefirot(['chokmah', 'binah', 'hod', 'yesod']);
                    document.querySelector('#separatio-depth').value = 6;
                    document.querySelector('#separatio-depth').nextElementSibling.textContent = '6/10';
                    document.querySelectorAll('input[name="perspective"]').forEach(cb => {
                        cb.checked = ['Epistemologiczna', 'Aksjologiczna'].includes(cb.value);
                    });
                    break;
            }
            
            // Ustawienie poziomu rekursji na 2 dla wszystkich predefiniowanych ścieżek
            setRecursionLevel('2');
            
            // Wyświetlenie powiadomienia
            showNotification(`Wczytano predefiniowaną ścieżkę: ${this.querySelector('h3').textContent}`);
        });
    });
    
    // Funkcje pomocnicze do ustawiania komponentów
    function setForma(forma) {
        activeForma = forma;
        formaCards.forEach(card => {
            card.classList.remove('active');
            if (card.getAttribute('data-forma') === forma) {
                card.classList.add('active');
            }
        });
        
        paramGroups.forEach(group => {
            group.classList.remove('active');
            if (group.getAttribute('data-forma') === forma) {
                group.classList.add('active');
            }
        });
        
        updateFormaDisplay();
    }
    
    function setFaza(faza) {
        activeFaza = faza;
        fazyElements.forEach(f => {
            f.classList.remove('active');
            if (f.getAttribute('data-faza') === faza) {
                f.classList.add('active');
            }
        });
        
        updateFazaDisplay();
    }
    
    function setSefirot(sefiroty) {
        // Wyczyść bieżące
        sefirotCircles.forEach(circle => {
            circle.classList.remove('active');
        });
        
        // Ustaw nowe
        activeSefirot = [...sefiroty];
        activeSefirot.forEach(sefira => {
            const circle = document.querySelector(`.sefira-circle[data-sefira="${sefira}"]`);
            if (circle) {
                circle.classList.add('active');
            }
        });
        
        // Aktualizuj licznik
        sefirotCountDisplay.textContent = activeSefirot.length.toString();
    }
    
    function setRecursionLevel(level) {
        recursionLevel = level;
        recursionCircles.forEach(circle => {
            circle.classList.remove('active');
            if (circle.getAttribute('data-level') === level) {
                circle.classList.add('active');
            }
        });
    }
    
    function clearCurrentConfig() {
        // Czyści wszystkie aktywne wybory
        activeSefirot = [];
        sefirotCircles.forEach(circle => circle.classList.remove('active'));
        sefirotCountDisplay.textContent = '0';
    }
    
    // Funkcje zarządzania szablonami
    function loadTemplates() {
        // Najpierw wyczyść listę
        while (szablonSelect.options.length > 1) {
            szablonSelect.remove(1);
        }
        
        // Pobierz zapisane szablony z localStorage
        const templates = JSON.parse(localStorage.getItem('simplexTemplates') || '{}');
        
        // Dodaj je do rozwijanej listy
        for (const [name, _] of Object.entries(templates)) {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            szablonSelect.appendChild(option);
        }
        
        // Ustaw przyciski jako nieaktywne, jeśli nie ma szablonów
        const noTemplates = Object.keys(templates).length === 0;
        wczytajSzablonBtn.disabled = noTemplates;
        usunSzablonBtn.disabled = noTemplates;
    }
    
    // Zapisz aktualną konfigurację jako szablon
    zapiszSzablonBtn.addEventListener('click', function() {
        const templateName = szablonNazwaInput.value.trim();
        
        if (!templateName) {
            showNotification('Wprowadź nazwę szablonu!', 'error');
            return;
        }
        
        // Pobierz wszystkie ustawienia
        const template = {
            activeForma: activeForma,
            activeFaza: activeFaza,
            activeSefirot: activeSefirot,
            recursionLevel: recursionLevel,
            parameters: {
                separatioDepth: document.querySelector('#separatio-depth').value,
                perspectives: Array.from(document.querySelectorAll('input[name="perspective"]:checked')).map(cb => cb.value),
                temporalScope: document.querySelector('input[name="temporal-scope"]:checked')?.value || 'Krótkoterminowy',
                systemLevel: document.querySelector('#coagulatio-level').value,
                tensionLevel: document.querySelector('#coniunctio-tension').value,
                syntheses: Array.from(document.querySelectorAll('input[name="synthesis"]:checked')).map(cb => cb.value)
            }
        };
        
        // Pobierz istniejące szablony i dodaj nowy
        const templates = JSON.parse(localStorage.getItem('simplexTemplates') || '{}');
        templates[templateName] = template;
        
        // Zapisz z powrotem do localStorage
        localStorage.setItem('simplexTemplates', JSON.stringify(templates));
        
        // Aktualizuj listę szablonów
        loadTemplates();
        
        // Wyczyść pole nazwy
        szablonNazwaInput.value = '';
        
        // Powiadomienie
        showNotification(`Szablon "${templateName}" został zapisany`);
    });
    
    // Wczytaj wybrany szablon
    wczytajSzablonBtn.addEventListener('click', function() {
        const templateName = szablonSelect.value;
        
        if (!templateName) {
            return;
        }
        
        // Pobierz dane szablonu
        const templates = JSON.parse(localStorage.getItem('simplexTemplates') || '{}');
        const template = templates[templateName];
        
        if (!template) {
            showNotification('Nie znaleziono szablonu!', 'error');
            return;
        }
        
        // Wczytaj konfigurację
        setForma(template.activeForma);
        setFaza(template.activeFaza);
        setSefirot(template.activeSefirot);
        setRecursionLevel(template.recursionLevel);
        
        // Wczytaj parametry
        if (template.parameters) {
            // Separatio
            if (template.parameters.separatioDepth) {
                const depthInput = document.querySelector('#separatio-depth');
                depthInput.value = template.parameters.separatioDepth;
                depthInput.nextElementSibling.textContent = `${template.parameters.separatioDepth}/10`;
            }
            
            // Perspektywy
            document.querySelectorAll('input[name="perspective"]').forEach(cb => {
                cb.checked = template.parameters.perspectives.includes(cb.value);
            });
            
            // Zakres temporalny
            if (template.parameters.temporalScope) {
                const temporalRadio = document.querySelector(`input[name="temporal-scope"][value="${template.parameters.temporalScope}"]`);
                if (temporalRadio) temporalRadio.checked = true;
            }
            
            // Poziom systemowy
            if (template.parameters.systemLevel) {
                document.querySelector('#coagulatio-level').value = template.parameters.systemLevel;
            }
            
            // Napięcie dialektyczne
            if (template.parameters.tensionLevel) {
                const tensionInput = document.querySelector('#coniunctio-tension');
                tensionInput.value = template.parameters.tensionLevel;
                tensionInput.nextElementSibling.textContent = `${template.parameters.tensionLevel}/10`;
            }
            
            // Typy syntezy
            document.querySelectorAll('input[name="synthesis"]').forEach(cb => {
                cb.checked = template.parameters.syntheses.includes(cb.value);
            });
        }
        
        // Powiadomienie
        showNotification(`Wczytano szablon "${templateName}"`);
    });
    
    // Usuń wybrany szablon
    usunSzablonBtn.addEventListener('click', function() {
        const templateName = szablonSelect.value;
        
        if (!templateName) {
            return;
        }
        
        // Pobierz szablony, usuń wybrany i zapisz z powrotem
        const templates = JSON.parse(localStorage.getItem('simplexTemplates') || '{}');
        delete templates[templateName];
        localStorage.setItem('simplexTemplates', JSON.stringify(templates));
        
        // Aktualizuj listę
        loadTemplates();
        
        // Powiadomienie
        showNotification(`Usunięto szablon "${templateName}"`);
    });
    
    // Generate prompt based on selected forma, faza, sefirot, and parameters
    function generatePrompt() {
        const problemText = problemInput.value.trim() || "zagadnienie, które wymaga alchemicznej transmutacji";
        
        let prompt = '';
        
        // Common intro
        prompt += `Przystępując do epistemicznej transmutacji zagadnienia: "${problemText}", `;
        
        // Forma-specific content
        switch (activeForma) {
            case 'separatio':
                const perspectiveCheckboxes = document.querySelectorAll('.parameter-group[data-forma="separatio"] .checkbox-group input:checked');
                const perspectives = Array.from(perspectiveCheckboxes).map(checkbox => checkbox.parentElement.textContent.trim());
                const depthLevel = document.getElementById('separatio-depth').value;
                
                prompt += `uruchom Primordialis Alembicus - narzędzie separacji esencji od przypadłości.\n\n`;
                prompt += `Twoje zadanie obejmuje:\n\n`;
                prompt += `1. MATERIA PRIMA: Zidentyfikuj substrat epistemiczny (fundamentalne elementy zagadnienia, ich naturę i wzajemne relacje).\n\n`;
                prompt += `2. CALCINATIO: Aplikuj następujące ognie analityczne do badanej materii:\n`;
                
                if (perspectives.length > 0) {
                    perspectives.forEach(perspective => {
                        if (perspective === 'Ontologiczna') {
                            prompt += `   * Ogień ontologiczny (pytanie o naturę bytu)\n`;
                        } else if (perspective === 'Epistemologiczna') {
                            prompt += `   * Ogień epistemologiczny (pytanie o fundamenty poznania)\n`;
                        } else if (perspective === 'Aksjologiczna') {
                            prompt += `   * Ogień aksjologiczny (pytanie o wartości i hierarchie)\n`;
                        } else if (perspective === 'Pragmatyczna') {
                            prompt += `   * Ogień pragmatyczny (pytanie o konsekwencje i użyteczność)\n`;
                        }
                    });
                }
                
                prompt += `\n3. SEPARATIO: Przeprowadź proceduralną destylację z głębią analityczną ${depthLevel}/10, uwzględniając:\n`;
                prompt += `   * Oddzielenie elementów esencjalnych od przypadkowych\n`;
                prompt += `   * Rozpoznanie elementów lotnych (zmiennych) od utrwalonych (stałych)\n`;
                prompt += `   * Identyfikację proporcji elementarnych w badanym fenomenie\n\n`;
                prompt += `4. SOLUTIO: Rozpuść uzyskane esencje w rozpuszczalniku kontekstualnym, obserwując ich zachowanie w różnych środowiskach konceptualnych.\n\n`;
                prompt += `5. QUINTESSENTIA: Wyodrębnij quintessencję - esencję piątego rzędu transcendującą cztery żywioły.\n\n`;
                break;
                
            case 'coagulatio':
                const temporalScope = document.querySelector('input[name="temporal-scope"]:checked').parentElement.textContent.trim();
                const systemLevel = document.getElementById('coagulatio-level').value;
                
                prompt += `uruchom Praxis Hermetica - narzędzie transformacji lotnych esencji w materialne manifestacje.\n\n`;
                prompt += `Twoje zadanie obejmuje:\n\n`;
                prompt += `1. FIXATIO: Określ praktyczne manifestacje w wymiarze temporalnym: ${temporalScope}.\n\n`;
                prompt += `2. MULTIPLICATIO: Zidentyfikuj potencjalne punkty dźwigni na poziomie systemowym: ${systemLevel}, gdzie minimalna interwencja może prowadzić do maksymalnej amplifikacji efektu.\n\n`;
                prompt += `3. FERMENTATIO: Określ warunki, w których zidentyfikowane praktyki mogą podlegać organicznemu rozwojowi i transformacji.\n\n`;
                prompt += `4. PROJECTIO: Przeprowadź myślowy eksperyment implementacji, uwzględniając potencjalne transmutacje niezamierzone, systemowe sprzężenia zwrotne i prognostyczne scenariusze ewolucji praktyk.\n\n`;
                prompt += `5. RUBEDO: Określ wskaźniki osiągnięcia "czerwienienia" - stanu, w którym praktyka osiąga dojrzałość i autonomiczną żywotność.\n\n`;
                break;
                
            case 'coniunctio':
                const tensionLevel = document.getElementById('coniunctio-tension').value;
                const synthesisTypes = document.querySelectorAll('.parameter-group[data-forma="coniunctio"] .checkbox-group input:checked');
                const syntheses = Array.from(synthesisTypes).map(checkbox => checkbox.parentElement.textContent.trim());
                
                prompt += `uruchom Caput Mortuum Resurrecto - narzędzie reaktywacji odrzuconych elementów.\n\n`;
                prompt += `Twoje zadanie obejmuje:\n\n`;
                prompt += `1. MORTIFICATIO RECENSIO: Przeprowadź inwentaryzację tego, co zostało odrzucone, zmarginalizowane lub pominięte w standardowych analizach zagadnienia.\n\n`;
                prompt += `2. PUTREFACTIO CREATIVA: Pozwól, by odrzucone elementy uległy twórczemu rozkładowi, z napięciem dialektycznym ustawionym na poziom ${tensionLevel}/10.\n\n`;
                prompt += `3. INVERSIO HIERARCHIAE: Przeprowadź eksperyment odwrócenia hierarchii wartości i rozważ, jakie nowe struktury poznawcze mogłyby wyłonić się z takiego odwrócenia.\n\n`;
                prompt += `4. CONIUNCTIO: Poszukaj możliwości połączenia przeciwieństw z wykorzystaniem`;
                
                if (syntheses.length > 0) {
                    prompt += ` następujących typów syntezy:\n`;
                    syntheses.forEach(type => {
                        prompt += `   * Synteza ${type}\n`;
                    });
                } else {
                    prompt += ` dialektycznej syntezy przeciwieństw.\n`;
                }
                
                prompt += `\n5. LAPIS PHILOSOPHORUM: Zidentyfikuj potencjalne "kamienie filozoficzne" - elementy odrzucone, które mogą okazać się kluczowe dla głębszego zrozumienia zagadnienia.\n\n`;
                break;
        }
        
        // Dodaj treść dla wybranej fazy alchemicznej
        if (activeFaza) {
            prompt += `\nFAZA ALCHEMICZNA: ${activeFaza.toUpperCase()}\n`;
            
            switch (activeFaza) {
                case 'nigredo':
                    prompt += `W fazie Nigredo (Czernienie) skupiamy się na:\n`;
                    prompt += `* Dekonstrukcji istniejących koncepcji\n`;
                    prompt += `* Identyfikacji ukrytych założeń i ograniczeń\n`;
                    prompt += `* Rozkładzie złożonych idei na fundamentalne komponenty\n`;
                    break;
                case 'albedo':
                    prompt += `W fazie Albedo (Bielenie) skupiamy się na:\n`;
                    prompt += `* Oczyszczeniu i destylacji esencji\n`;
                    prompt += `* Klaryfikacji kluczowych koncepcji\n`;
                    prompt += `* Wydobyciu uniwersalnych zasad\n`;
                    break;
                case 'citrinitas':
                    prompt += `W fazie Citrinitas (Żółcenie) skupiamy się na:\n`;
                    prompt += `* Integracji przeciwstawnych perspektyw\n`;
                    prompt += `* Identyfikacji złotego środka\n`;
                    prompt += `* Transformacji zwykłego rozumienia w głębszą świadomość\n`;
                    break;
                case 'rubedo':
                    prompt += `W fazie Rubedo (Czerwienienie) skupiamy się na:\n`;
                    prompt += `* Przekładaniu abstrakcyjnych wglądów na konkretne działania\n`;
                    prompt += `* Tworzeniu praktycznych aplikacji\n`;
                    prompt += `* Formułowaniu transformacyjnych pytań dla nowego cyklu\n`;
                    break;
            }
        }
        
        // Dodaj treść dla wybranych sefirot
        if (activeSefirot.length > 0) {
            prompt += `\nŚCIEŻKA SEFIROTYCZNA:\n`;
            prompt += `Eksploracja zagadnienia przez następujące sefiroty:\n`;
            
            const sefirotDescriptions = {
                keter: 'Keter (Korona) - identyfikacja fundamentalnej zasady jedności',
                chokmah: 'Chokmah (Mądrość) - badanie dynamicznych, twórczych sił',
                binah: 'Binah (Zrozumienie) - analiza struktur i ograniczeń',
                chesed: 'Chesed (Miłosierdzie) - poszukiwanie integracji i harmonii',
                gevurah: 'Gevurah (Siła) - badanie napięć i ograniczeń',
                tiferet: 'Tiferet (Piękno) - poszukiwanie równowagi i harmonii',
                netzach: 'Netzach (Zwycięstwo) - eksploracja wartości emocjonalnych i estetycznych',
                hod: 'Hod (Chwała) - analiza aspektów komunikacyjnych i intelektualnych',
                yesod: 'Yesod (Fundament) - tworzenie praktycznego fundamentu',
                malkuth: 'Malkuth (Królestwo) - przekładanie na konkretne manifestacje'
            };
            
            activeSefirot.forEach(sefira => {
                if (sefirotDescriptions[sefira]) {
                    prompt += `* ${sefirotDescriptions[sefira]}\n`;
                }
            });
        }
        
        // Meta-poziom rekursji
        if (recursionLevel > 1) {
            prompt += `\nSPIRITUS RECTOR: Przeprowadź metarefleksję ${recursionLevel}-go rzędu nad całością procesu poznawczego, uwzględniając:\n`;
            prompt += `* Granice zastosowanych procedur\n`;
            prompt += `* Ukryte założenia epistemologiczne\n`;
            prompt += `* Niewypowiedziane wartości kierujące procesem\n`;
            prompt += `* Systemowe punkty ślepe\n`;
            prompt += `* Możliwe alternatywne podejścia do analizowanego zagadnienia\n`;
        }
        
        return prompt;
    }
    
    // System powiadomień
    function showNotification(message, type = 'success') {
        notificationMessage.textContent = message;
        notification.className = 'notification show ' + type;
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
    
    // Preview button
    previewButton.addEventListener('click', function() {
        const prompt = generatePrompt();
        promptPreview.textContent = prompt;
        previewModal.style.display = 'block';
    });
    
    // Transmute button
    transmuteButton.addEventListener('click', function() {
        const prompt = generatePrompt();
        // In a real application, this would likely send the prompt to an API
        // For now, we'll just show the preview
        promptPreview.textContent = prompt;
        previewModal.style.display = 'block';
    });
    
    // Close modal
    closeButton.addEventListener('click', function() {
        previewModal.style.display = 'none';
    });
    
    // Click outside modal to close
    window.addEventListener('click', function(event) {
        if (event.target === previewModal) {
            previewModal.style.display = 'none';
        }
    });
    
    // Copy prompt to clipboard
    copyPromptButton.addEventListener('click', function() {
        navigator.clipboard.writeText(promptPreview.textContent).then(
            function() {
                copyPromptButton.textContent = 'Skopiowano!';
                setTimeout(() => {
                    copyPromptButton.textContent = 'Kopiuj do schowka';
                }, 2000);
            }
        );
    });
});