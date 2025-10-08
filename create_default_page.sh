#!/bin/bash
# ./create_default_page.sh 페이지명

if [ -z "$1" ]; then
  echo "Usage: $0 <name>"
  exit 1
fi

NAME="$1"
TARGET="src/app/$NAME"
LAYOUT_FILE="$TARGET/layout.tsx"
PAGE_FILE="$TARGET/page.tsx"
LAYOUT_VAR="${NAME}Layout"
PAGE_VAR="${NAME}Page"

mkdir -p "$TARGET"

cat > "$LAYOUT_FILE" <<EOF
// ${LAYOUT_FILE}

const ${LAYOUT_VAR} = ({ children }: { children: React.ReactNode }) => (
  <section>
    <header>
      <h1>${LAYOUT_VAR} Component</h1>
    </header>
    <main>
      {children}
    </main>
    <footer>
      <small>© 2025 Example Layout</small>
    </footer>
  </section>
);

export default ${LAYOUT_VAR};
EOF

cat > "$PAGE_FILE" <<EOF
// ${PAGE_FILE}

const ${PAGE_VAR} = () => (
  <div>
    <h2>${PAGE_VAR} Component</h2>
    <p>This is an auto-generated page for /${NAME}.</p>
  </div>
);

export default ${PAGE_VAR};
EOF

echo "Created $LAYOUT_FILE and $PAGE_FILE with content in $(pwd)/$TARGET"
