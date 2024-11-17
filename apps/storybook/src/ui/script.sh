#!/bin/bash

# List of files (space-separated)
files=(
  "accordion.tsx" "badge.tsx" "carousel.tsx" "context-menu.tsx" "hover-card.tsx"
  "navigation-menu.tsx" "resizable.tsx" "sidebar.tsx" "table.tsx" "toggle-group.tsx"
  "alert-dialog.tsx" "breadcrumb.tsx" "chart.tsx" "dialog.tsx" "input-otp.tsx"
  "pagination.tsx" "scroll-area.tsx" "skeleton.tsx" "tabs.tsx" "toggle.tsx"
  "alert.tsx" "button.tsx" "checkbox.tsx" "drawer.tsx" "input.tsx"
  "popover.tsx" "select.tsx" "slider.tsx" "textarea.tsx" "tooltip.tsx"
  "aspect-ratio.tsx" "calendar.tsx" "collapsible.tsx" "dropdown-menu.tsx" "label.tsx"
  "progress.tsx" "separator.tsx" "sonner.tsx" "toaster.tsx"
  "avatar.tsx" "card.tsx" "command.tsx" "form.tsx" "menubar.tsx"
  "radio-group.tsx" "sheet.tsx" "switch.tsx" "toast.tsx"
)

# Loop through each file
for file in "${files[@]}"; do
  # Extract base name without extension
  base_name="${file%.tsx}"

  # Capitalize hyphen-separated names
  capitalized_name=$(echo "$base_name" | awk -F '-' '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) substr($i,2)}1' OFS='')

  # Generate the new fixture file name in `AaBb.fixture.tsx` style
  fixture_file="${capitalized_name}.fixture.tsx"

  # Write the content to the fixture file
  echo "// This is the fixture file for ${capitalized_name}" > "$fixture_file"
  echo "import '~/index.css';" >> "$fixture_file"
  echo "import ${capitalized_name} from '@/components/ui/${base_name}';" >> "$fixture_file"
  echo "" >> "$fixture_file"
  echo "export default <${capitalized_name} />;" >> "$fixture_file"

  echo "Created: $fixture_file"
done

echo "All fixture files created."

