// Speech to Text made by MubiLop
// See in Ruby Devs!
// https://rubyteam.tech/


(function (Scratch) {
    'use strict';
    const vm = Scratch.vm;
    const runtime = vm.runtime;
    
    const extIcon = "data:image/svg+xml;charset=utf-8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjxzdmcgd2lkdGg9IjQwcHgiIGhlaWdodD0iNDBweCIgdmlld0JveD0iMCAwIDMwIDMwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPg0KICAgIDx0aXRsZT5FeHRlbnNpb25zL1NvZnR3YXJlL1NwZWVjaC10by1UZXh0LUJsb2NrPC90aXRsZT4NCiAgICA8ZyBpZD0iRXh0ZW5zaW9ucy9Tb2Z0d2FyZS9UZXh0LXRvLVNwZWVjaC1CbG9jayIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLW9wYWNpdHk9IjAuMTUiPg0KICAgICAgICA8ZyBpZD0idGV4dDJzcGVlY2giIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQuMDAwMDAwLCA0LjAwMDAwMCkiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSIjMDAwMDAwIj4NCiAgICAgICAgICAgIDxwYXRoIGZpbGw9IiM0RDRENEQiIGQ9Ik04LDdBMiwyIDAgMCwxIDEwLDlWMTRBMiwyIDAgMCwxIDgsMTZBMiwyIDAgMCwxIDYsMTRWOUEyLDIgMCAwLDEgOCw3TTE0LDE0QzE0LDE2Ljk3IDExLjg0LDE5LjQ0IDksMTkuOTJWMjJIN1YxOS45MkM0LjE2LDE5LjQ0IDIsMTYuOTcgMiwxNEg0QTQsNCAwIDAsMCA4LDE4QTQsNCAwIDAsMCAxMiwxNEgxNE0yMS40MSw5LjQxTDE3LjE3LDEzLjY2TDE4LjE4LDEwSDE0QTIsMiAwIDAsMSAxMiw4VjRBMiwyIDAgMCwxIDE0LDJIMjBBMiwyIDAgMCwxIDIyLDRWOEMyMiw4LjU1IDIxLjc4LDkuMDUgMjEuNDEsOS40MVoiIC8+DQogICAgICAgIDwvZz4NCiAgICA8L2c+DQo8L3N2Zz4=";
    const blockIcon = "data:image/svg+xml;charset=utf-8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjxzdmcgd2lkdGg9IjQwcHgiIGhlaWdodD0iNDBweCIgdmlld0JveD0iMCAwIDMwIDMwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPg0KICAgIDx0aXRsZT5FeHRlbnNpb25zL1NvZnR3YXJlL1NwZWVjaC10by1UZXh0LUJsb2NrPC90aXRsZT4NCiAgICA8ZyBpZD0iRXh0ZW5zaW9ucy9Tb2Z0d2FyZS9UZXh0LXRvLVNwZWVjaC1CbG9jayIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLW9wYWNpdHk9IjAuMTUiPg0KICAgICAgICA8ZyBpZD0idGV4dDJzcGVlY2giIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQuMDAwMDAwLCA0LjAwMDAwMCkiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSIjMDAwMDAwIj4NCiAgICAgICAgICAgIDxwYXRoIGZpbGw9IiM0RDRENEQiIGQ9Ik04LDdBMiwyIDAgMCwxIDEwLDlWMTRBMiwyIDAgMCwxIDgsMTZBMiwyIDAgMCwxIDYsMTRWOUEyLDIgMCAwLDEgOCw3TTE0LDE0QzE0LDE2Ljk3IDExLjg0LDE5LjQ0IDksMTkuOTJWMjJIN1YxOS45MkM0LjE2LDE5LjQ0IDIsMTYuOTcgMiwxNEg0QTQsNCAwIDAsMCA4LDE4QTQsNCAwIDAsMCAxMiwxNEgxNE0yMS40MSw5LjQxTDE3LjE3LDEzLjY2TDE4LjE4LDEwSDE0QTIsMiAwIDAsMSAxMiw4VjRBMiwyIDAgMCwxIDE0LDJIMjBBMiwyIDAgMCwxIDIyLDRWOEMyMiw4LjU1IDIxLjc4LDkuMDUgMjEuNDEsOS40MVoiIC8+DQogICAgICAgIDwvZz4NCiAgICA8L2c+DQo8L3N2Zz4=";
    if (!Scratch.extensions.unsandboxed) {
        throw new Error("Speech2Text is not unsandboxed. Try again with unsandbox.");
    }

    class SpeechToTextExtension {
        constructor() {
            this.recognition = null;
            this.hearListeners = [];
            this.selectedLanguage = 'en-US'; // Default language: English (United States)
        }

        getInfo() {
            return {
                id: 'speechtotext',
                name: 'Speech to Text',
                menuIconURI: extIcon,
                blockIconURI: blockIcon,
                blocks: [
                    {
                        opcode: 'hearAndWait',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Start Speech Recognition',
                    },
                    {
                        opcode: 'stopSpeechRecognition',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Stop Speech Recognition',
                    },
                    {
                        opcode: 'getRecognizedText',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Recognized Text',
                    },
                    {
                        opcode: 'clearSpeech',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Clear Speech',
                    },
                    {
                        opcode: 'setLanguage',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Set Language to [LANGUAGE]',
                        arguments: {
                            LANGUAGE: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'languages',
                                defaultValue: 'English (United States)',
                            },
                        },
                    },
                    {
                        text: "Broken functions or Not Updated",
                        blockType: Scratch.BlockType.LABEL
                    },
                    {
                        opcode: 'whenIHear',
                        blockType: Scratch.BlockType.HAT,
                        text: 'When I hear [HEARD]',
                        arguments: {
                            HEARD: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'hello',
                            },
                        },
                    }
                ],
                menus: {
                    languages: this.getLanguageMenu(),
                },
            };
        }

        getLanguageMenu() {
            const languageMenu = [];
            const languages = [
                ['Afrikaans', 'af-ZA'],
                ['Bahasa Indonesia', 'id-ID'],
                ['Bahasa Melayu', 'ms-MY'],
                ['Català', 'ca-ES'],
                ['Čeština', 'cs-CZ'],
                ['Deutsch', 'de-DE'],
                ['English', 'en-AU', 'Australia'],
                ['English', 'en-CA', 'Canada'],
                ['English', 'en-IN', 'India'],
                ['English', 'en-NZ', 'New Zealand'],
                ['English', 'en-ZA', 'South Africa'],
                ['English', 'en-GB', 'United Kingdom'],
                ['English', 'en-US', 'United States'],
                ['Español', 'es-AR', 'Argentina'],
                ['Español', 'es-BO', 'Bolivia'],
                ['Español', 'es-CL', 'Chile'],
                ['Español', 'es-CO', 'Colombia'],
                ['Español', 'es-CR', 'Costa Rica'],
                ['Español', 'es-EC', 'Ecuador'],
                ['Español', 'es-SV', 'El Salvador'],
                ['Español', 'es-ES', 'España'],
                ['Español', 'es-US', 'Estados Unidos'],
                ['Español', 'es-GT', 'Guatemala'],
                ['Español', 'es-HN', 'Honduras'],
                ['Español', 'es-MX', 'México'],
                ['Español', 'es-NI', 'Nicaragua'],
                ['Español', 'es-PA', 'Panamá'],
                ['Español', 'es-PY', 'Paraguay'],
                ['Español', 'es-PE', 'Perú'],
                ['Español', 'es-PR', 'Puerto Rico'],
                ['Español', 'es-DO', 'República Dominicana'],
                ['Español', 'es-UY', 'Uruguay'],
                ['Español', 'es-VE', 'Venezuela'],
                ['Euskara', 'eu-ES'],
                ['Français', 'fr-FR'],
                ['Galego', 'gl-ES'],
                ['Hrvatski', 'hr_HR'],
                ['IsiZulu', 'zu-ZA'],
                ['Íslenska', 'is-IS'],
                ['Italiano', 'it-IT', 'Italia'],
                ['Italiano', 'it-CH', 'Svizzera'],
                ['Magyar', 'hu-HU'],
                ['Nederlands', 'nl-NL'],
                ['Norsk bokmål', 'nb-NO'],
                ['Polski', 'pl-PL'],
                ['Português', 'pt-BR', 'Brasil'],
                ['Português', 'pt-PT', 'Portugal'],
                ['Română', 'ro-RO'],
                ['Slovenčina', 'sk-SK'],
                ['Suomi', 'fi-FI'],
                ['Svenska', 'sv-SE'],
                ['Türkçe', 'tr-TR'],
                ['български', 'bg-BG'],
                ['Pусский', 'ru-RU'],
                ['Српски', 'sr-RS'],
                ['한국어', 'ko-KR'],
                ['中文', 'cmn-Hans-CN', '普通话 (中国大陆)'],
                ['中文', 'cmn-Hans-HK', '普通话 (香港)'],
                ['中文', 'cmn-Hant-TW', '中文 (台灣)'],
                ['中文', 'yue-Hant-HK', '粵語 (香港)'],
                ['日本語', 'ja-JP'],
                ['Lingua latīna', 'la'],
            ];

            languages.forEach(([languageName, languageCode, additionalInfo]) => {
                const trimmedLanguageName = languageName.trim();
                const trimmedAdditionalInfo = additionalInfo ? additionalInfo.trim() : '';
                const menuText = trimmedAdditionalInfo ? `${trimmedLanguageName} (${trimmedAdditionalInfo})` : trimmedLanguageName;

                languageMenu.push({
                    text: menuText,
                    value: languageCode,
                });
            });

            return languageMenu;
        }

        setLanguage({ LANGUAGE }) {
            this.selectedLanguage = LANGUAGE;
            this.restartSpeechRecognition();
        }

        restartSpeechRecognition() {
            this.stopSpeechRecognition();
            this.hearListeners = [];
            this.hearAndWait();
        }

        async hearAndWait() {
            if (!this.recognition) {
                const canrecord = await Scratch.canRecordAudio()
                if (canrecord === true) {
                    this.recognition = new webkitSpeechRecognition();
                    this.recognition.continuous = true;
                    this.recognition.interimResults = true;
    
                    this.recognition.onresult = (event) => {
                        const final_transcript = this.extractFinalTranscript(event);
                        this.setRecognizedText(final_transcript);
                    };
    
                    this.recognition.onend = () => {
                        this.recognition.start();
                    };
    
                    this.recognition.lang = this.selectedLanguage;
                    this.recognition.start();
                } else {
                    console.log("Recording was Denied")
                    throw new Error("Recording was Denied");
                }
            }
        }

        stopSpeechRecognition() {
            if (this.recognition) {
                this.recognition.stop();
                this.recognition = null;
            }
        }

        getRecognizedText() {
            return this.recognizedText || '';
        }

        setRecognizedText(text) {
            this.recognizedText = text.trim();
        }

        extractFinalTranscript(event) {
            let final_transcript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    final_transcript += event.results[i][0].transcript;
                }
            }
            return final_transcript;
        }

        clearSpeech() {
            this.setRecognizedText('');
        }
    }

    const speechToTextExtension = new SpeechToTextExtension();
    Scratch.extensions.register(speechToTextExtension);
})(Scratch);
