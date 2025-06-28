import template from "./template.js";

class MultiSelectPureJs {
  constructor(container, optionItems = [], config = {}) {
    this.container = container;
    this.optionItems = optionItems;
    this.selectedOptions = [];
    this.config =  {
      placeholder: config.placeholder || "Select options",
      searchPlaceholder: config.searchPlaceholder || "Search options",
      selectAllText: config.selectAllText || "Select All",
      noOptionsText: config.noOptionsText || "No options available",
      noResultsText: config.noResultsText || "No results found",
      search: config.search !== undefined ? config.search : true,
      theme: {
        // Colors for light mode
        colors: {
          tagBg: config.tagBg || "gray-400", // Tailwind color class (gray-400, red-500, etc.) or custom value [e.g., "[#f00]", "[#000]"]
          tagText: config.tagText || "white",
          textPrimary: config.textPrimary || "gray-700",
          textSecondary: config.textSecondary || "gray-500",
          border: config.border || "gray-300",
          optionHover: config.optionHover || "gray-100",
          optionSelected: config.optionSelected || "blue-500",
          border: config.border || "gray-300",
          inputFocusBorder: config.inputFocusBorder || "blue-500",
          focusRing: config.focusRing || "blue-500", // Tailwind focus ring color class (blue-500, red-500, etc.) or custom value [e.g., "[#f00]", "[#000]"]
          background: config.background || "white",
          dropdownBg: config.dropdownBg || "white", // Background color for the dropdown
          inputBg: config.inputBg || "white", // Background color for the input field
          inputText: config.inputText || "gray-700", // Text color for the input field
        },
        borderRadius: config.borderRadius || "md", // Tailwind border radius class (sm, md, lg) or custom value [e.g., "[4px]", "[8px]"]
        borderWidth: config.borderWidth || "1px", // Tailwind border width class (1, 2, 4) or custom value [e.g., "[1px]", "[2px]"]

        checkboxShape: config.checkboxShape == 'square' ? "none" : "full", // Tailwind checkbox shape class (sm, md, lg) or custom value [e.g., "[4px]", "[8px]"]

        darkMode: config.darkMode !== undefined ? config.darkMode : true, // Enable dark mode styles

        // Colors for dark mode
        darkColors: {
          tagBg: config.darkTagBg || "gray-600", // Tailwind color class (gray-600, red-700, etc.) or custom value [e.g., "[#f00]", "[#000]"]
          tagText: config.darkTagText || "white",
          textPrimary: config.darkTextPrimary || "gray-200",
          textSecondary: config.darkTextSecondary || "gray-400",
          border: config.darkBorder || "gray-500",
          optionHover: config.darkOptionHover || "gray-700",
          optionSelected: config.darkOptionSelected || "blue-400",
          border: config.darkBorder || "gray-500",
          inputFocusBorder: config.darkInputFocusBorder || "blue-400",
          focusRing: config.darkFocusRing || "blue-400", // Tailwind focus ring color class (blue-400, red-400, etc.) or custom value [e.g., "[#f00]", "[#000]"]
          background: config.darkBackground || "gray-800", // Background color for the dropdown in dark mode
          dropdownBg: config.darkDropdownBg || "gray-800", // Background color for the dropdown in dark mode
          inputBg: config.darkInputBg || "gray-800", // Background color for the input field in dark mode
          inputText: config.darkInputText || "gray-200", // Text color for the input field in dark mode
        },
      },
    };

    this.render();
    this.cacheElements();
    this.setOptions(this.optionItems);
    this.attachEvents();
  }

  render() {
    if (!this.container || !this.container.hasAttribute("data-ms")) {
      throw new Error("Container element is required");
    }
    
    this.container.classList.add("w-full", "relative", "select-none");
    this.container.innerHTML = template(this.config);
  }

  cacheElements() {
    this.multipleSelectTrigger =
      this.container.querySelector("[data-ms-trigger]");
    this.multipleSelectDropdown =
      this.container.querySelector("[data-ms-dropdown]");
    this.optionsContainer = this.container.querySelector(
      "[data-ms-options-container]"
    );
    this.tagsContainer = this.container.querySelector("[data-selected-tags]");
    this.placeholder = this.container.querySelector("[data-placeholder]");
    this.selectElement = this.container.querySelector("select");
    this.checkmarkAll = this.container.querySelector("[data-checkmark-all]");
    this.searchInput = this.container.querySelector("[data-ms-search]");
  }

  createOptionElement(item) {
    const option = document.createElement("option");
    option.value = item.id;
    option.textContent = item.name;
    return option;
  }

  createCustomOptionElement(item) {
    return `
		<li class="hover:bg-${this.config.theme.darkMode ? this.config.theme.darkColors.optionHover : this.config.theme.colors.optionHover}" data-option="${item.id}">
			<div class="flex items-center gap-3 py-2 px-4 cursor-pointer">
                <div class="flex items-center justify-center w-4 h-4 border border-${this.config.theme.darkMode ? this.config.theme.darkColors.border : this.config.theme.colors.border} rounded-${this.config.theme.checkboxShape} overflow-hidden">
                    <div class="bg-${this.config.theme.darkMode ? this.config.theme.darkColors.optionSelected : this.config.theme.colors.optionSelected} w-full h-full flex items-center justify-center hidden" data-checkmark>
                    <svg width="12px" height="12px" viewBox="0 -4 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.06066 6.4393C2.47487 5.85355 1.52513 5.85355 0.93934 6.4393C0.353553 7.0251 0.353553 7.9749 0.93934 8.5607L7.93934 15.5607C8.52513 16.1464 9.47487 16.1464 10.0607 15.5607L23.0607 2.56066C23.6464 1.97487 23.6464 1.02513 23.0607 0.43934C22.4749 -0.14645 21.5251 -0.14645 20.9393 0.43934L9 12.3787L3.06066 6.4393z" fill="white"/>
                    </svg>
                    </div>
                </div>
			    <span>${item.name}</span>
			</div>
		</li>`;
  }

  setOptions(items) {
    if (!items || items.length === 0) {
      this.optionsContainer.insertAdjacentHTML(
        "beforeend",
        `<p class="text-${this.config.theme.darkMode ? this.config.theme.darkColors.textSecondary : this.config.theme.colors.textSecondary} text-center">${this.config.noOptionsText}</p>`
      );
      return;
    }
    items.forEach((item) => {
      this.selectElement.appendChild(this.createOptionElement(item));
      this.optionsContainer.insertAdjacentHTML(
        "beforeend",
        this.createCustomOptionElement(item)
      );
    });

    // Attach click listeners to each option
    this.container.querySelectorAll("[data-option]").forEach((element) => {
      element.addEventListener("click", (e) => {
        this.toggleOption(e.currentTarget);
      });
    });
  }

  toggleOption(target) {
    const value = target.getAttribute("data-option");

    const setOptionSelected = (val, isSelected) => {
      const option = this.selectElement.querySelector(`option[value="${val}"]`);
      if (option) option.selected = isSelected;
    };

    if (value !== "selectAll") {
      const index = this.selectedOptions.indexOf(value);

      if (index !== -1) {
        this.selectedOptions.splice(index, 1);
        setOptionSelected(value, false);
      } else {
        this.selectedOptions.push(value);
        setOptionSelected(value, true);
      }

      this.toggleCheckmark(target);
    } else {
      const notSelected = this.optionsContainer.querySelectorAll(
        "li[data-option]:not([data-selected])"
      );
      const selected = this.optionsContainer.querySelectorAll(
        "li[data-option][data-selected]"
      );

      if (notSelected.length > 0) {
        notSelected.forEach((item) => {
          const val = item.getAttribute("data-option");
          this.selectedOptions.push(val);
          this.toggleCheckmark(item);
          setOptionSelected(val, true);
        });
      } else {
        this.selectedOptions.length = 0;
        selected.forEach((item) => {
          const val = item.getAttribute("data-option");
          this.toggleCheckmark(item);
          setOptionSelected(val, false);
        });
      }
    }

    this.toggleTag();
  }

  toggleCheckmark(option) {
    const checkmark = option.querySelector("[data-checkmark]");
    checkmark.classList.toggle("hidden");

    if (option.hasAttribute("data-selected")) {
      option.removeAttribute("data-selected");
      checkmark.parentElement.classList.remove('border-none', 'overflow-hidden');
    } else {
      checkmark.parentElement.classList.add('border-none', 'overflow-hidden');
      option.setAttribute("data-selected", "");
    }

    const optionsQty =
      this.optionsContainer.querySelectorAll("[data-option]").length;
    if (optionsQty === this.selectedOptions.length) {
      this.checkmarkAll.classList.remove("hidden");
      this.checkmarkAll.parentElement.classList.add('border-none', 'overflow-hidden');
    } else {
      this.checkmarkAll.classList.add("hidden");
      this.checkmarkAll.parentElement.classList.remove('border-none', 'overflow-hidden');
    }
  }

  toggleTag() {
    this.tagsContainer.innerHTML = "";

    if (this.selectedOptions.length > 0) {
      this.placeholder.classList.add("hidden");
      this.tagsContainer.classList.remove("hidden");

      this.selectedOptions.forEach((id) => {
        const item = this.optionItems.find((item) => item.id == id);
        if (item) {
          const tag = document.createElement("span");
          tag.className = `bg-${this.config.theme.darkMode ? this.config.theme.darkColors.tagBg : this.config.theme.colors.tagBg} text-${this.config.theme.darkMode ? this.config.theme.darkColors.tagText : this.config.theme.colors.tagText} text-xs px-2 py-1 rounded-${this.config.theme.borderRadius}`;
          tag.textContent = item.name;
          this.tagsContainer.appendChild(tag);
        }
      });
    } else {
      this.placeholder.classList.remove("hidden");
      this.tagsContainer.classList.add("hidden");
    }
  }

  searchOptions() {
    const searchValue = this.searchInput.value.toLowerCase();
    const options = this.optionsContainer.querySelectorAll("[data-option]");

    let hasVisible = false;

    options.forEach((option) => {
      const optionText = option.textContent.toLowerCase();
      const isMatch = optionText.includes(searchValue);

      option.classList.toggle("hidden", !isMatch);
      if (isMatch) hasVisible = true;
    });

    // Remove existing "No results" message if present
    let emptyMessage = this.optionsContainer.querySelector("[data-empty]");
    if (emptyMessage) emptyMessage.remove();

    // Show message only if no results
    if (!hasVisible) {
      this.optionsContainer.insertAdjacentHTML(
        "beforeend",
        `<li data-empty class="text-${this.config.theme.darkMode ? this.config.theme.darkColors.textSecondary : this.config.theme.colors.textSecondary} text-center py-2">${this.config.noResultsText}</li>`
      );
    }
  }

  attachEvents() {
    this.multipleSelectTrigger.addEventListener("click", (e) => {
      e.stopPropagation();

      this.multipleSelectDropdown.classList.toggle("hidden");
      this.multipleSelectTrigger.classList.toggle("open");
      this.multipleSelectTrigger
        .querySelector("svg")
        .classList.toggle("rotate-180");
    });

    document.addEventListener("click", (e) => {
      if (
        this.multipleSelectTrigger.classList.contains("open") &&
        !this.multipleSelectTrigger.contains(e.target) &&
        !this.multipleSelectDropdown.contains(e.target)
      ) {
        this.multipleSelectDropdown.classList.add("hidden");
        this.multipleSelectTrigger.classList.remove("open");
      }
    });

    this.searchInput.addEventListener("input", () => this.searchOptions());
  }
}

if (typeof window !== "undefined") {
  window.MultiSelectPureJs = MultiSelectPureJs;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = MultiSelectPureJs;
}

export default MultiSelectPureJs;
