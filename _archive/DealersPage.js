// ARCHIVED: Original Dealers (BranchesPage) component
// Removed from active navigation in favour of "Become a Dealer" form.
// Restore by adding BranchesPage back to App.js and wiring the "branches"
// footer tab to render it instead of DealerPage.
//
// RESTORE CHECKLIST:
// 1. Re-add the navigationItems entry:
//    { key: "branches", label: "Dealers", drawerLabel: "Dealers", icon: "location-outline", svgIcon: "locationPin" }
// 2. Add the locationPin SVG block inside renderFooterIcon() (see below)
// 3. Paste BranchesPage() function back into App.js
// 4. Paste branches[] data back near the top constants
// 5. Paste archivedStyles keys back into StyleSheet.create({})
// 6. Change the "branches" render line back to: <BranchesPage />

// Footer Nav Icon (locationPin SVG)
// Paste this block inside renderFooterIcon() in App.js, before the final
// Ionicons fallback return statement.
//
//   if (item.svgIcon === "locationPin") {
//     return (
//       <Svg width={22} height={22} viewBox="0 0 32 32">
//         <Path
//           fill={color}
//           d="M16.114-0.011c-6.559 0-12.114 5.587-12.114 12.204 0 6.93 6.439 14.017 10.77 18.998 0.017 0.020 0.717 0.797 1.579 0.797h0.076c0.863 0 1.558-0.777 1.575-0.797 4.064-4.672 10-12.377 10-18.998 0-6.618-4.333-12.204-11.886-12.204zM16.515 29.849c-0.035 0.035-0.086 0.074-0.131 0.107-0.046-0.032-0.096-0.072-0.133-0.107l-0.523-0.602c-4.106-4.71-9.729-11.161-9.729-17.055 0-5.532 4.632-10.205 10.114-10.205 6.829 0 9.886 5.125 9.886 10.205 0 4.474-3.192 10.416-9.485 17.657zM16.035 6.044c-3.313 0-6 2.686-6 6s2.687 6 6 6 6-2.687 6-6-2.686-6-6-6zM16.035 16.044c-2.206 0-4.046-1.838-4.046-4.044s1.794-4 4-4c2.207 0 4 1.794 4 4 0.001 2.206-1.747 4.044-3.954 4.044z"
//         />
//       </Svg>
//     );
//   }

// Data
// Was defined at the top of App.js alongside other constants.

const branches = [
  {
    name: "Dongol Automobiles",
    location: "Itahari",
    contact: "Suman Dongol",
    phone: "9852024365"
  },
  {
    name: "Auto Palace",
    location: "Biratnagar",
    contact: "Raju Khatri",
    phone: "9852031716"
  },
  {
    name: "Santosh DYB",
    location: "Kathmandu",
    contact: "Kafindra Bhattarai",
    phone: "9852041927"
  }
];

// Component
// Was placed between OnboardingScreen and AboutPage in App.js.
// Depends on: AIRTABLE_TOKEN, AIRTABLE_BASE, AIRTABLE_TABLE, branches,
//             Ionicons, Linking, styles (branch* and cityDropdown* keys below).

function BranchesPage() {
  const [selectedCity, setSelectedCity] = React.useState("All");
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [airtableDealers, setAirtableDealers] = React.useState([]);

  React.useEffect(() => {
    if (!AIRTABLE_TOKEN) return undefined;

    const fetchDealers = async () => {
      try {
        const formula = encodeURIComponent('{Status}="Yes"');
        const res = await fetch(
          `https://api.airtable.com/v0/${AIRTABLE_BASE}/${AIRTABLE_TABLE}?filterByFormula=${formula}`,
          { headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` } }
        );
        const data = await res.json();
        if (data.records) {
          setAirtableDealers(data.records.map((r) => ({
            id: r.id,
            name: r.fields["Company Name"] || "",
            location: r.fields["City"] || "",
            contact: r.fields["Full Name"] || "",
            phone: String(r.fields["Phone"] || "")
          })));
        }
      } catch {}
    };
    fetchDealers();
    const interval = setInterval(fetchDealers, 30000);
    return () => clearInterval(interval);
  }, []);

  const allDealers = [...branches, ...airtableDealers];
  const cities = ["All", ...Array.from(new Set(allDealers.map((b) => b.location).filter(Boolean)))];
  const filtered = selectedCity === "All" ? allDealers : allDealers.filter((b) => b.location === selectedCity);

  return (
    <View>
      <Text style={styles.title}>Dealers</Text>

      <View style={styles.cityDropdownWrap}>
        <Text style={styles.cityDropdownLabel}>Filter by City</Text>
        <Pressable
          style={styles.cityDropdownBtn}
          onPress={() => setDropdownOpen((o) => !o)}
        >
          <Text style={styles.cityDropdownBtnText}>{selectedCity}</Text>
          <Ionicons name={dropdownOpen ? "chevron-up-outline" : "chevron-down-outline"} size={18} color="#075985" />
        </Pressable>
        {dropdownOpen && (
          <View style={styles.cityDropdownList}>
            {cities.map((city) => (
              <Pressable
                key={city}
                style={[styles.cityDropdownOption, selectedCity === city && styles.cityDropdownOptionActive]}
                onPress={() => { setSelectedCity(city); setDropdownOpen(false); }}
              >
                <Text style={[styles.cityDropdownOptionText, selectedCity === city && styles.cityDropdownOptionTextActive]}>
                  {city}
                </Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>

      <View style={styles.branchList}>
        {filtered.map((branch) => (
          <View key={branch.id || branch.phone} style={styles.branchCard}>
            <View style={styles.branchIcon}>
              <Ionicons name="location-outline" size={24} color="#075985" />
            </View>
            <View style={styles.branchContent}>
              <Text style={styles.branchName}>{branch.name}</Text>
              <Text style={styles.branchLocation}>{branch.location}</Text>
              <Text style={styles.branchContact}>{branch.contact}</Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Call ${branch.contact}`}
                onPress={() => Linking.openURL(`tel:${branch.phone}`)}
                style={({ hovered }) => [styles.branchPhone, hovered && styles.branchPhoneHover]}
              >
                <Ionicons name="call-outline" size={16} color="#075985" />
                <Text style={styles.branchPhoneText}>{branch.phone}</Text>
              </Pressable>
            </View>
          </View>
        ))}
        {filtered.length === 0 && (
          <Text style={styles.cityDropdownEmpty}>No dealers found in {selectedCity}.</Text>
        )}
      </View>
    </View>
  );
}

// Styles
// These keys were part of the main StyleSheet.create({}) in App.js.
// Add them back there when restoring the component.

const archivedStyles = {
  branchList: {
    gap: 12
  },
  branchCard: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    padding: 14,
    flexDirection: "row",
    gap: 12,
    shadowColor: "#000000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1
  },
  branchIcon: {
    width: 42,
    height: 42,
    borderRadius: 8,
    backgroundColor: "#e5f3ff",
    alignItems: "center",
    justifyContent: "center"
  },
  branchContent: {
    flex: 1,
    minWidth: 0
  },
  branchName: {
    color: "#020617",
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 3
  },
  branchLocation: {
    color: "#075985",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8
  },
  branchContact: {
    color: "#334155",
    fontSize: 14,
    marginBottom: 10
  },
  branchPhone: {
    alignSelf: "flex-start",
    minHeight: 34,
    borderRadius: 6,
    backgroundColor: "#e5f3ff",
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 6
  },
  branchPhoneHover: {
    backgroundColor: "#dbeafe"
  },
  branchPhoneText: {
    color: "#075985",
    fontSize: 14,
    fontWeight: "800"
  },
  cityDropdownWrap: {
    marginBottom: 16,
    zIndex: 10
  },
  cityDropdownLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#64748b",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5
  },
  cityDropdownBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 11,
    backgroundColor: "#ffffff"
  },
  cityDropdownBtnText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0f172a"
  },
  cityDropdownList: {
    position: "absolute",
    top: 72,
    left: 0,
    right: 0,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 }
  },
  cityDropdownOption: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9"
  },
  cityDropdownOptionActive: {
    backgroundColor: "#e5f3ff"
  },
  cityDropdownOptionText: {
    fontSize: 15,
    color: "#334155",
    fontWeight: "500"
  },
  cityDropdownOptionTextActive: {
    color: "#075985",
    fontWeight: "700"
  },
  cityDropdownEmpty: {
    textAlign: "center",
    color: "#94a3b8",
    fontSize: 15,
    paddingVertical: 24
  }
};
