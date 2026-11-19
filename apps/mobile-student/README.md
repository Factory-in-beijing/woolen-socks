# DriveNet student app (React Native, Expo)

First release: the theory app (video course, tickets, quick test, road signs, account). Screens follow the design 1:1 and run on
fixtures behind view-model hooks; the backend is attached later through the generated `@drivenet/api-client`.

```bash
pnpm --filter @drivenet/mobile-student start        # Expo dev server
pnpm --filter @drivenet/mobile-student export:web   # web build (used for visual checks)
```

## Layout

| Path                                | What lives there                                                                  |
| ----------------------------------- | --------------------------------------------------------------------------------- |
| `app/`                              | Thin routes (expo-router). One file per screen, re-exporting its Screen component |
| `src/features/<feature>/screens/`   | Screen components (layout)                                                        |
| `src/features/<feature>/art/`       | SVG illustrations as strings (rendered with `react-native-svg`)                   |
| `src/features/<feature>/strings.ts` | UI texts of the feature (English)                                                 |
| `src/components/`                   | Shared UI building blocks (`ScreenFrame`, ...)                                    |
| `src/theme/`                        | Fonts and design tokens                                                           |
