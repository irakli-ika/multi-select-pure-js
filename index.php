<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        print_r($_POST['selectItems']) ?? 'No selection made';
    }
?>
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        <title>Document</title>
    </head>

    <body>

        <form action="?" method="POST">
            <div data-ms></div>
            <div data-multi-select></div>

            <button type="submit">submit</button>
        </form>
    </body>

    <script type="module">
        import MultiSelect from './index.js';

        const options = [
            { id: 1, name: 'PHP' },
            { id: 2, name: 'JavaScript' },
            { id: 3, name: 'Python' },
            { id: 4, name: 'Java' },
            { id: 5, name: 'C#' },
            { id: 6, name: 'C++' },
            { id: 7, name: 'Ruby' },
            { id: 8, name: 'Go' },
            { id: 9, name: 'TypeScript' },
            { id: 10, name: 'Swift' }
        ];
    
        new MultiSelect(document.querySelector('[data-ms]'), options);
    </script>

    <!-- <script type="module">
        import template from './template.js';
        
        document.addEventListener('DOMContentLoaded', () => {
            const optionItems = [{
                    id: 1,
                    name: 'Category 1',
                },
                {
                    id: 2,
                    name: 'Category 2',
                },
                {
                    id: 3,
                    name: 'Category 3',
                },
                {
                    id: 4,
                    name: 'Category 4',
                },
                {
                    id: 5,
                    name: 'Category 5',
                },
                {
                    id: 6,
                    name: 'Category 6',
                },
                {
                    id: 7,
                    name: 'Category 7',
                },
                {
                    id: 8,
                    name: 'Category 8',
                },
                {
                    id: 9,
                    name: 'Category 9',
                },
                {
                    id: 10,
                    name: 'Category 10',
                }
            ];
            const selectedOptions = [];
            const multipleSelectElement = document.querySelector('[data-ms]');

            if (!multipleSelectElement) {
                console.error('Multiple select element not found');
                return;
            }

            multipleSelectElement.innerHTML = template();

            const multipleSelectTrigger = multipleSelectElement.querySelector('[data-ms-trigger]');
            const multipleSelectDropdown = multipleSelectElement.querySelector('[data-ms-dropdown]');
            const optionsContainer = multipleSelectElement.querySelector('[data-ms-options-container]');
            const searchInput = multipleSelectElement.querySelector('[data-ms-search]');


            const createOptionElement = (item) => {
                const option = document.createElement('option');

                option.value = item.id;
                option.textContent = item.name;
                return option;
            };

            const createCustomOptionElement = (item) => {
                return `<li class="py-2 px-4 hover:bg-gray-100" data-option="${item.id}">
                                    <div class="flex items-center gap-3 cursor-pointer">
                                        <div
                                            class="flex items-center justify-center w-4 h-4 rounded-sm border border-gray-400 overflow-hidden">
                                            <div class="bg-green-500 w-full h-full flex items-center justify-center hidden" data-checkmark>
                                                <svg width="12px" height="12px" viewBox="0 -4 24 24"
                                                    id="meteor-icon-kit__solid-checkmark" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                                        d="M3.06066 6.4393C2.47487 5.85355 1.52513 5.85355 0.93934 6.4393C0.353553 7.0251 0.353553 7.9749 0.93934 8.5607L7.93934 15.5607C8.52513 16.1464 9.47487 16.1464 10.0607 15.5607L23.0607 2.56066C23.6464 1.97487 23.6464 1.02513 23.0607 0.43934C22.4749 -0.14645 21.5251 -0.14645 20.9393 0.43934L9 12.3787L3.06066 6.4393z"
                                                        fill="white" />
                                                </svg>
                                            </div>
                                        </div>
                                        <span>${item.name}</span>
                                    </div>
                                </li>`;
            }

            const toggleOption = (target) => {
                const value = target.getAttribute('data-option');

                const setOptionSelected = (value, isSelected) => {
                    const option = multipleSelectElement.querySelector(`option[value="${value}"]`);
                    if (option) option.selected = isSelected;
                };

                if (value != 'selectAll') {
                    const index = selectedOptions.indexOf(value);

                    if (index !== -1) {
                        selectedOptions.splice(index, 1);
                        setOptionSelected(value, false);
                    } else {
                        selectedOptions.push(value);
                        setOptionSelected(value, true);
                    }

                    toggleCheckmark(target);


                } else {
                    const notSelected = optionsContainer.querySelectorAll('li:not([data-selected])');
                    const selected = optionsContainer.querySelectorAll('[data-selected]');

                    if (notSelected.length > 0) {
                        notSelected.forEach(item => {
                            const value = item.getAttribute('data-option');
                            selectedOptions.push(value);
                            toggleCheckmark(item);
                            setOptionSelected(value, true);
                        });
                    } else {
                        selectedOptions.length = 0; // Clear the array
                        selected.forEach(item => {
                            const value = item.getAttribute('data-option');
                            toggleCheckmark(item);
                            setOptionSelected(value, false);
                        });
                    }
                }

                toggleTag();
            }

            const toggleCheckmark = (option) => {
                const checkmark = option.querySelector('[data-checkmark]');
                const checkmarkAll = multipleSelectElement.querySelector('[data-checkmark-all]');
                const optionsQty = optionsContainer.querySelectorAll('[data-option]').length;

                checkmark.classList.toggle('hidden');

                option.hasAttribute('data-selected') ? option.removeAttribute('data-selected') : option.setAttribute(
                    'data-selected', '');

                if (optionsQty == selectedOptions.length) checkmarkAll.classList.remove('hidden');
                else checkmarkAll.classList.add('hidden');
            }

            const toggleTag = () => {
                const tagsContainer = document.querySelector('[data-selected-tags]');
                const placeholder = document.querySelector('[data-placeholder]');

                tagsContainer.innerHTML = ''; // Clear existing tags
                if (selectedOptions.length > 0) {
                    placeholder.classList.add('hidden');
                    tagsContainer.classList.remove('hidden');
                    selectedOptions.forEach(id => {
                        const item = optionItems.find(item => item.id == id);
                        if (item) {
                            const tag = document.createElement('span');
                            tag.className = 'bg-gray-200 text-xs px-2 py-1 rounded-sm';
                            tag.textContent = item.name;
                            tagsContainer.appendChild(tag);
                        }
                    });
                } else {
                    placeholder.classList.remove('hidden');
                    tagsContainer.classList.add('hidden');
                }
            }

            const setOptions = (items) => {
                const selectElement = multipleSelectElement.querySelector('select');

                if (!items || items.length === 0) {
                    optionsContainer.insertAdjacentHTML('beforeend',
                        `<p class="text-gray-500 text-center">No options available</p>`);
                    return;
                }
                items.forEach(item => {
                    selectElement.appendChild(createOptionElement(item));
                    optionsContainer.insertAdjacentHTML('beforeend', createCustomOptionElement(item));
                });
            }

            setOptions(optionItems);

            multipleSelectElement.querySelectorAll('[data-option]').forEach(element => {
                element.addEventListener('click', e => {
                    toggleOption(e.currentTarget);
                });
            });
        

            multipleSelectTrigger.addEventListener('click', function (e) {
                e.stopPropagation();

                multipleSelectDropdown.classList.toggle('hidden');

                this.classList.toggle('open');

                this.querySelector('svg').classList.toggle('rotate-180');
            })

            document.addEventListener('click', function (e) {
                if (
                    multipleSelectTrigger.classList.contains('open') &&
                    !multipleSelectTrigger.contains(e.target) &&
                    !multipleSelectDropdown.contains(e.target)
                ) {
                    multipleSelectDropdown.classList.add('hidden');
                    multipleSelectTrigger.classList.remove('open');
                }
            });
            
            searchInput.addEventListener('input', function () {
                const filterText = this.value.toLowerCase();
                const options = optionsContainer.querySelectorAll('[data-option]');

                options.forEach(option => {
                    const optionText = option.textContent.toLowerCase();
                    if (optionText.includes(filterText)) {
                        option.classList.remove('hidden');
                    } else {
                        option.classList.add('hidden');
                    }
                });
            });
        });
    </script> -->

</html>