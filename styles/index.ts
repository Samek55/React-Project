import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  splashScreen: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 46
  },
  splashContent: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  splashLogo: {
    width: 160,
    height: 160,
    borderRadius: 80
  },
  splashTitle: {
    marginTop: 26,
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "900",
    textAlign: "center"
  },
  splashSubtitle: {
    width: "100%",
    maxWidth: 280,
    marginTop: 12,
    color: "#e0f2fe",
    fontSize: 16,
    fontWeight: "800",
    lineHeight: 23,
    textAlign: "center"
  },
  splashServiceList: {
    width: "100%",
    maxWidth: 320,
    marginTop: 28,
    gap: 9
  },
  splashServiceItem: {
    minHeight: 54,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1
  },
  splashServiceIcon: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: "#e0f2fe",
    alignItems: "center",
    justifyContent: "center"
  },
  splashServiceCopy: {
    flex: 1,
    minWidth: 0
  },
  splashServiceTitle: {
    color: "#020617",
    fontSize: 14,
    fontWeight: "900"
  },
  splashServiceText: {
    marginTop: 2,
    color: "#64748b",
    fontSize: 12,
    fontWeight: "700"
  },
  splashLoadingTrack: {
    width: 154,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#e2e8f0",
    overflow: "hidden"
  },
  splashLoadingBar: {
    width: "70%",
    height: "100%",
    borderRadius: 2,
    backgroundColor: "#075985"
  },
  onboardingScreen: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingBottom: 28
  },
  onboardingSkipRow: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 8
  },
  onboardingBrand: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  onboardingLogo: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: "#e5e7eb"
  },
  onboardingBrandText: {
    color: "#075985",
    fontSize: 18,
    fontWeight: "900"
  },
  onboardingSkipText: {
    color: "#075985",
    fontSize: 14,
    fontWeight: "800",
    paddingHorizontal: 12,
    paddingVertical: 6
  },
  onboardingCenter: {
    flex: 1,
    justifyContent: "center"
  },
  onboardingTextBlock: {
    alignSelf: "center",
    marginBottom: 10,
    paddingHorizontal: 4
  },
  onboardingTitle: {
    color: "#075985",
    fontSize: 30,
    lineHeight: 38,
    fontWeight: "900"
  },
  onboardingBody: {
    marginTop: 12,
    color: "#075985",
    fontSize: 16,
    lineHeight: 24
  },
  onboardingVisual: {
    overflow: "hidden"
  },
  onboardingImage: {
    width: "100%",
    height: "100%"
  },
  onboardingDots: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 7,
    paddingVertical: 8
  },
  onboardingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#cbd5e1"
  },
  onboardingDotActive: {
    width: 26,
    backgroundColor: "#075985"
  },
  onboardingButton: {
    width: 200,
    minHeight: 54,
    alignSelf: "center",
    marginTop: 2,
    borderRadius: 27,
    backgroundColor: "#075985",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#075985",
    shadowOpacity: 0.22,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5
  },
  onboardingButtonText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "800"
  },
  drawerOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
    flexDirection: "row",
    alignItems: "flex-start",
    paddingLeft: 16,
    paddingTop: 0
  },
  drawerScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15, 23, 42, 0.48)"
  },
  drawerPanel: {
    width: "82%",
    maxWidth: 340,
    backgroundColor: "#f1f5f9",
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000000",
    shadowOpacity: 0.28,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 4 },
    elevation: 20
  },
  drawerHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 14,
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 12
  },
  drawerLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#e2e8f0"
  },
  drawerTitle: {
    flex: 1,
    color: "#075985",
    fontSize: 20,
    fontWeight: "900"
  },
  drawerClose: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center"
  },
  drawerCloseHover: {
    backgroundColor: "#e2e8f0"
  },
  drawerDivider: {
    height: 1,
    backgroundColor: "#e2e8f0",
    marginHorizontal: 14,
    marginVertical: 2
  },
  drawerSectionDivider: {
    height: 1,
    backgroundColor: "#d1d5db",
    marginHorizontal: 14,
    marginVertical: 4
  },
  drawerBody: {
    flex: 1,
    flexDirection: "column",
    paddingVertical: 0
  },
  drawerSection: {
    paddingHorizontal: 8
  },
  drawerItem: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 9,
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  drawerItemHover: {
    backgroundColor: "#e2e8f0"
  },
  drawerItemActive: {
    backgroundColor: "#dbeafe"
  },
  drawerItemText: {
    flex: 1,
    color: "#334155",
    fontSize: 16,
    fontWeight: "600"
  },
  drawerItemTextActive: {
    color: "#075985",
    fontWeight: "800"
  },
  drawerAdminWrap: {
    paddingHorizontal: 14,
    paddingBottom: 14,
    paddingTop: 8
  },
  drawerAdminButton: {
    minHeight: 58,
    alignSelf: "flex-start",
    paddingHorizontal: 36,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#334155",
    alignItems: "center",
    justifyContent: "center"
  },
  drawerAdminButtonHover: {
    backgroundColor: "#e2e8f0"
  },
  drawerAdminText: {
    color: "#334155",
    fontSize: 16,
    fontWeight: "700"
  },
  buyHero: {
    borderRadius: 8,
    backgroundColor: "#075985",
    paddingHorizontal: 18,
    paddingVertical: 20,
    marginBottom: 18,
    shadowColor: "#000000",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4
  },
  buyHeroIcon: {
    width: 58,
    height: 58,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.16)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16
  },
  buyHeroTitle: {
    color: "#ffffff",
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "900"
  },
  buyHeroText: {
    marginTop: 9,
    color: "#e0f2fe",
    fontSize: 15,
    lineHeight: 23
  },
  buyHeroButton: {
    alignSelf: "flex-start",
    minHeight: 42,
    marginTop: 18,
    borderRadius: 6,
    backgroundColor: "#111318",
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  buyHeroButtonHover: {
    backgroundColor: "#2b2d31"
  },
  buyHeroButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "800"
  },
  buyHighlightList: {
    gap: 12
  },
  buyHighlightCard: {
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
  buyHighlightIcon: {
    width: 42,
    height: 42,
    borderRadius: 8,
    backgroundColor: "#e5f3ff",
    alignItems: "center",
    justifyContent: "center"
  },
  buyHighlightContent: {
    flex: 1,
    minWidth: 0
  },
  buyHighlightTitle: {
    color: "#020617",
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 4
  },
  buyHighlightBody: {
    color: "#475569",
    fontSize: 14,
    lineHeight: 21
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 10
  },
  navCard: {
    width: "100%",
    minHeight: 64,
    paddingHorizontal: 7,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 0,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 7
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2
  },
  headerBackButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8
  },
  headerBackText: {
    color: "#0f172a",
    fontSize: 16,
    fontWeight: "600"
  },
  iconButton: {
    padding: 7,
    alignItems: "center",
    justifyContent: "center"
  },
  iconButtonHover: {
    backgroundColor: "#f1f5f9",
    borderRadius: 8
  },
  brand: {
    minWidth: 0,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingRight: 4,
    paddingLeft: 6
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#e5e7eb"
  },
  brandText: {
    flexShrink: 1,
    color: "#020617",
    fontSize: 25,
    fontWeight: "800"
  },
  phoneTooltip: {
    position: "absolute",
    top: 50,
    right: 0,
    minWidth: 174,
    borderRadius: 6,
    backgroundColor: "#111827",
    paddingHorizontal: 10,
    paddingVertical: 8,
    shadowColor: "#000000",
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    zIndex: 50
  },
  phoneTooltipText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "700"
  },
  container: {
    width: "100%",
    maxWidth: 564,
    alignSelf: "center",
    position: "relative",
    paddingHorizontal: 18,
    paddingBottom: 128
  },
  title: {
    color: "#020617",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 34,
    paddingBottom: 22,
    borderBottomWidth: 1,
    borderBottomColor: "#dedede"
  },
  field: {
    marginBottom: 28
  },
  featurePickerOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 2
  },
  featureFieldOpen: {
    position: "relative",
    zIndex: 3
  },
  label: {
    fontSize: 14,
    color: "#020617",
    fontWeight: "400",
    marginBottom: 8
  },
  required: {
    color: "#c2185b",
    fontWeight: "400"
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#dedede",
    borderRadius: 8,
    paddingHorizontal: 11,
    paddingVertical: 0,
    backgroundColor: "#ffffff",
    color: "#020617",
    fontSize: 14,
    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1
  },
  notes: {
    height: 82,
    paddingTop: 10,
    textAlignVertical: "top"
  },
  helper: {
    color: "#64748b",
    fontSize: 13,
    marginTop: 6
  },
  select: {
    height: 48,
    borderWidth: 1,
    borderColor: "#dedede",
    borderRadius: 8,
    paddingHorizontal: 11,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1
  },
  selectChip: {
    color: "#075985",
    fontSize: 14,
    fontWeight: "700",
    borderRadius: 5,
    backgroundColor: "#e5f3ff",
    paddingHorizontal: 9,
    paddingVertical: 6,
    overflow: "hidden"
  },
  selectPlaceholder: {
    color: "#9ca3af",
    fontSize: 15
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#dedede",
    borderTopWidth: 0,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    backgroundColor: "#ffffff",
    maxHeight: 260,
    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2
  },
  dropdownScroll: {
    maxHeight: 260
  },
  dropdownItem: {
    minHeight: 42,
    justifyContent: "center",
    paddingHorizontal: 16,
    backgroundColor: "#ffffff"
  },
  dropdownItemSelected: {
    backgroundColor: "#f8fafc"
  },
  dropdownText: {
    color: "#020617",
    fontSize: 16
  },
  dropdownTextSelected: {
    fontWeight: "700"
  },
  uploadLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10
  },
  clearUploadButton: {
    minHeight: 28,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    backgroundColor: "#fef2f2"
  },
  clearUploadText: {
    color: "#dc2626",
    fontSize: 12,
    fontWeight: "700"
  },
  upload: {
    height: 108,
    borderWidth: 1,
    borderColor: "#dedede",
    borderStyle: "dashed",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: 8,
    shadowOpacity: 0,
    elevation: 0
  },
  uploadText: {
    color: "#475569",
    fontSize: 14
  },
  browseText: {
    color: "#006ffd",
    textDecorationLine: "underline"
  },
  filePreviewList: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10
  },
  filePreview: {
    width: 134,
    height: 134,
    borderWidth: 1,
    borderColor: "#dedede",
    borderRadius: 6,
    backgroundColor: "#ffffff",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  },
  fileRemove: {
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    alignItems: "center",
    justifyContent: "center"
  },
  fileThumb: {
    width: "100%",
    height: 92,
    resizeMode: "cover"
  },
  fileDoc: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  fileDocText: {
    color: "#475569",
    fontSize: 14,
    fontWeight: "700"
  },
  fileName: {
    width: "100%",
    color: "#334155",
    fontSize: 13,
    textAlign: "center",
    paddingHorizontal: 6,
    paddingVertical: 8
  },
  featureBox: {
    minHeight: 40,
    borderWidth: 1,
    borderColor: "#dedede",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    padding: 8,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1
  },
  addButton: {
    width: 29,
    height: 29,
    borderRadius: 4,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center"
  },
  featureList: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 7
  },
  featurePlaceholder: {
    color: "#9ca3af",
    fontSize: 15
  },
  feature: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: "#f4f4f5"
  },
  featureSelected: {
    backgroundColor: "#dbeafe"
  },
  featureText: {
    color: "#111827",
    fontSize: 12
  },
  featureDropdown: {
    marginTop: 4,
    borderWidth: 1,
    borderColor: "#dedede",
    borderTopWidth: 0,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    backgroundColor: "#ffffff",
    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2
  },
  featureOptions: {
    maxHeight: 258
  },
  featureOption: {
    minHeight: 42,
    justifyContent: "center",
    paddingHorizontal: 16,
    backgroundColor: "#ffffff"
  },
  featureOptionSelected: {
    backgroundColor: "#ffffff"
  },
  featureOptionText: {
    color: "#020617",
    fontSize: 16
  },
  featureOptionTextMuted: {
    color: "#9ca3af",
    fontSize: 16
  },
  featureOptionTextSelected: {
    color: "#9ca3af",
    fontWeight: "400"
  },
  actions: {
    marginTop: 42,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  clearButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
    paddingRight: 16,
    cursor: "pointer"
  },
  clearButtonDisabled: {
    cursor: "auto"
  },
  clearText: {
    color: "#006ffd",
    fontSize: 15
  },
  clearTextDisabled: {
    color: "#93c5fd"
  },
  clearTextHover: {
    textDecorationLine: "underline"
  },
  submitButton: {
    backgroundColor: "#111318",
    borderRadius: 6,
    paddingHorizontal: 18,
    paddingVertical: 12,
    cursor: "pointer"
  },
  submitButtonHover: {
    backgroundColor: "#2b2d31"
  },
  submitButtonDisabled: {
    backgroundColor: "#6b6b6b",
    cursor: "auto"
  },
  submitText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700"
  },
  messageBox: {
    marginTop: 16,
    marginBottom: 4,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 15,
    paddingVertical: 13
  },
  successBox: {
    borderColor: "#bbf7d0",
    backgroundColor: "#f0fdf4"
  },
  errorBox: {
    borderColor: "#fecaca",
    backgroundColor: "#fff1f2"
  },
  messageText: {
    fontSize: 16
  },
  successText: {
    color: "#008236"
  },
  errorText: {
    color: "#dc2626",
    fontSize: 13,
    marginTop: 6
  },
  footer: {
    color: "#475569",
    fontSize: 13,
    marginTop: 55
  },
  faqPage: {
    paddingTop: 8
  },
  faqPageTitle: {
    color: "#075985",
    fontSize: 30,
    fontWeight: "900",
    lineHeight: 38,
    marginBottom: 6
  },
  faqPageSubtitle: {
    color: "#64748b",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 24
  },
  faqChipsScroll: {
    marginBottom: 28
  },
  faqChipsRow: {
    flexDirection: "row",
    gap: 10,
    paddingRight: 4
  },
  faqChip: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f1f5f9",
    borderWidth: 1,
    borderColor: "#e2e8f0"
  },
  faqChipActive: {
    backgroundColor: "#075985",
    borderColor: "#075985"
  },
  faqChipText: {
    color: "#475569",
    fontSize: 13,
    fontWeight: "700"
  },
  faqChipTextActive: {
    color: "#ffffff"
  },
  faqSectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
    marginTop: 8
  },
  faqSectionAccent: {
    width: 4,
    height: 20,
    borderRadius: 2,
    backgroundColor: "#075985"
  },
  faqSectionTitle: {
    color: "#0c4a6e",
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 0.3,
    textTransform: "uppercase"
  },
  faqItem: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 14,
    backgroundColor: "#ffffff",
    paddingHorizontal: 18,
    paddingVertical: 16,
    marginBottom: 10,
    shadowColor: "#075985",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    cursor: "pointer"
  },
  faqItemActive: {
    borderColor: "#075985",
    backgroundColor: "#f0f9ff",
    shadowOpacity: 0.14
  },
  faqItemHover: {
    borderColor: "#bae6fd",
    backgroundColor: "#f8fbff"
  },
  faqQuestionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12
  },
  faqQuestion: {
    flex: 1,
    color: "#1e293b",
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 22
  },
  faqQuestionExpanded: {
    color: "#075985"
  },
  faqChevron: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#f0f9ff",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0
  },
  faqChevronActive: {
    backgroundColor: "#075985"
  },
  faqAnswer: {
    color: "#475569",
    fontSize: 14,
    lineHeight: 22,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#e0f2fe"
  },
  aboutPage: {
    marginTop: 8,
    paddingBottom: 16
  },
  aboutHero: {
    alignItems: "center",
    backgroundColor: "#f0f9ff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#bae6fd",
    paddingTop: 12,
    paddingBottom: 24,
    paddingHorizontal: 20,
    marginBottom: 16
  },
  aboutHeroLogo: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: "#075985",
    marginBottom: 14
  },
  aboutHeroName: {
    color: "#075985",
    fontSize: 26,
    fontWeight: "900",
    marginBottom: 8
  },
  aboutHeroTagline: {
    color: "#334155",
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
    paddingHorizontal: 8
  },
  aboutStatsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20
  },
  aboutStatCard: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    paddingVertical: 14,
    alignItems: "center",
    shadowColor: "#075985",
    shadowOpacity: 0.07,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2
  },
  aboutStatValue: {
    color: "#075985",
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 3
  },
  aboutStatLabel: {
    color: "#64748b",
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5
  },
  aboutMission: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
    backgroundColor: "#ffffff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    padding: 16,
    marginBottom: 24,
    shadowColor: "#075985",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2
  },
  aboutMissionIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#f0f9ff",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0
  },
  aboutMissionTitle: {
    color: "#0c4a6e",
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 6
  },
  aboutMissionText: {
    color: "#475569",
    fontSize: 13,
    lineHeight: 20
  },
  aboutSectionTitle: {
    color: "#0f172a",
    fontSize: 17,
    fontWeight: "900",
    marginBottom: 14
  },
  aboutServiceCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
    backgroundColor: "#ffffff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    padding: 16,
    marginBottom: 10,
    shadowColor: "#075985",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2
  },
  aboutServiceIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#f0f9ff",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0
  },
  aboutServiceTitle: {
    color: "#075985",
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 4
  },
  aboutServiceDesc: {
    color: "#475569",
    fontSize: 13,
    lineHeight: 19
  },
  aboutValuesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 28
  },
  aboutValueCard: {
    flex: 1,
    minWidth: "44%",
    backgroundColor: "#ffffff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    padding: 14,
    alignItems: "center",
    gap: 8,
    shadowColor: "#075985",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1
  },
  aboutValueIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f9ff",
    alignItems: "center",
    justifyContent: "center"
  },
  aboutValueLabel: {
    color: "#0c4a6e",
    fontSize: 13,
    fontWeight: "800"
  },
  aboutCTA: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#075985",
    borderRadius: 14,
    paddingVertical: 16,
    shadowColor: "#075985",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5
  },
  aboutCTAHover: {
    backgroundColor: "#0c4a6e"
  },
  aboutCTAText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800"
  },
  aboutBox: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingVertical: 16,
    shadowColor: "#000000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1
  },
  aboutText: {
    color: "#475569",
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 12
  },
  footerNavShell: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center"
  },
  footerNav: {
    width: "100%",
    minHeight: 74,
    paddingHorizontal: 7,
    paddingTop: 6,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 0,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  footerNavItem: {
    flex: 1,
    minHeight: 50,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
    gap: 4
  },
  footerNavItemActive: {
    backgroundColor: "#e0f2fe"
  },
  footerNavItemHover: {
    backgroundColor: "#f8fafc"
  },
  footerNavText: {
    color: "#64748b",
    fontSize: 8.5,
    lineHeight: 10,
    textAlign: "center",
    fontWeight: "800"
  },
  footerNavTextActive: {
    color: "#075985"
  },
  report: {
    textDecorationLine: "underline"
  },
  glossaryPage: {
    paddingTop: 4
  },
  glossaryIntro: {
    textAlign: "center",
    color: "#475569",
    fontSize: 17,
    lineHeight: 26,
    marginBottom: 24,
    paddingHorizontal: 8
  },
  glossaryAlphabetCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2
  },
  glossaryLetterGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8
  },
  glossaryLetterRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 8
  },
  glossaryLetterBtn: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    justifyContent: "center"
  },
  glossaryLetterBtnActive: {
    backgroundColor: "#075985"
  },
  glossaryLetterText: {
    color: "#475569",
    fontSize: 15,
    fontWeight: "700"
  },
  glossaryLetterTextActive: {
    color: "#ffffff"
  },
  glossaryActiveLetter: {
    textAlign: "center",
    color: "#075985",
    fontSize: 32,
    fontWeight: "900",
    marginBottom: 16
  },
  glossaryCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    padding: 16,
    marginBottom: 12,
    shadowColor: "#075985",
    shadowOpacity: 0.07,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2
  },
  glossaryTerm: {
    color: "#0c4a6e",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 6
  },
  glossaryDef: {
    color: "#475569",
    fontSize: 14,
    lineHeight: 22
  },
  policyPage: {
    paddingTop: 4,
    paddingBottom: 16
  },
  policyPageTitle: {
    color: "#075985",
    fontSize: 26,
    fontWeight: "900",
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0"
  },
  policyIntro: {
    color: "#475569",
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 20
  },
  policySection: {
    marginBottom: 20
  },
  policySectionHeading: {
    color: "#0c4a6e",
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 6
  },
  policySectionBody: {
    color: "#475569",
    fontSize: 14,
    lineHeight: 22
  },
  drawerLegalRow: {
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 4,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0"
  },
  drawerLegalLink: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 6
  },
  drawerLegalLinkHover: {
    backgroundColor: "#e2e8f0"
  },
  drawerLegalText: {
    color: "#64748b",
    fontSize: 11,
    fontWeight: "600"
  },
  drawerLegalTextActive: {
    color: "#075985"
  },
  agreementWrap: {
    marginTop: 20,
    marginBottom: 4
  },
  agreementRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10
  },
  checkboxHitArea: {
    paddingTop: 1
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: "#94a3b8",
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0
  },
  checkboxChecked: {
    backgroundColor: "#075985",
    borderColor: "#075985"
  },
  agreementText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 20,
    color: "#334155"
  },
  policyLink: {
    color: "#075985",
    textDecorationLine: "underline",
    fontWeight: "600"
  },
  otpOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999
  },
  otpScrim: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.55)"
  },
  otpModal: {
    width: "90%",
    maxWidth: 360,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingBottom: 28,
    paddingTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10
  },
  otpHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16
  },
  otpTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#020617"
  },
  otpIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#e0f2fe",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 14
  },
  otpSubtitle: {
    fontSize: 14,
    color: "#475569",
    textAlign: "center",
    fontWeight: "600"
  },
  otpPhone: {
    fontSize: 16,
    fontWeight: "800",
    color: "#020617",
    textAlign: "center",
    marginTop: 4,
    marginBottom: 20,
    letterSpacing: 1
  },
  otpBoxRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 12
  },
  otpBox: {
    width: 44,
    height: 52,
    borderWidth: 1.5,
    borderColor: "#cbd5e1",
    borderRadius: 10,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "800",
    color: "#020617",
    backgroundColor: "#f8fafc"
  },
  otpBoxFilled: {
    borderColor: "#075985",
    backgroundColor: "#eff6ff"
  },
  otpBoxError: {
    borderColor: "#ef4444",
    backgroundColor: "#fef2f2"
  },
  otpError: {
    color: "#ef4444",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10
  },
  otpVerifyButton: {
    backgroundColor: "#075985",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 14
  },
  otpVerifyButtonDisabled: {
    backgroundColor: "#93c5fd"
  },
  otpVerifyText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "800"
  },
  otpResendRow: {
    alignItems: "center",
    marginBottom: 10
  },
  otpResendTimer: {
    color: "#64748b",
    fontSize: 13,
    fontWeight: "600"
  },
  otpResendLink: {
    color: "#075985",
    fontSize: 13,
    fontWeight: "700",
    textDecorationLine: "underline"
  },
  otpNote: {
    color: "#94a3b8",
    fontSize: 11,
    fontWeight: "600",
    textAlign: "center"
  }
});

export default styles;
