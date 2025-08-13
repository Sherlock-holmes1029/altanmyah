// utils/buildSectorMenuItems.ts
import type { MenuProps } from "antd";
import type { SectorMap } from "../Core/const/sideMenu";

type MenuItem = Required<MenuProps>["items"][number];

// 👇 Arabic group names
const GROUP_NAMES: Record<string, string> = {
  "1": "البيانات المالية",
  "2": "البيئة و المناخ",
  "3": "البيانات العامة للبلدية",
  "4": "بيانات التصنيف الائتماني",
  "5": "الأصول الثابتة",
  "6": "بيانات سكانية",
};

export function buildSectorMenuItems(sectors: SectorMap | null): MenuItem[] {
  if (!sectors) return [];

  const grouped: Record<string, Array<{ key: string; label: string }>> = {};
  const ungrouped: Array<{ key: string; label: string }> = [];

  Object.entries(sectors).forEach(([key, val]) => {
    const label = val.name;
    const g = val.group_number;
    if (g) {
      (grouped[g] ??= []).push({ key, label });
    } else {
      ungrouped.push({ key, label });
    }
  });

  // Sort groups numerically 1..N
  const groupKeys = Object.keys(grouped).sort((a, b) => Number(a) - Number(b));

  // Build submenus for groups
  const groupSubmenus: MenuItem[] = groupKeys.map((g) => ({
    key: `grp:${g}`,
    label: GROUP_NAMES[g] ?? `مجموعة ${g}`, // fallback if a key is missing
    children: grouped[g]
      .sort((a, b) => a.label.localeCompare(b.label, "ar"))
      .map((s) => ({ key: `sector:${s.key}`, label: s.label })),
  }));

  // Ungrouped items at top level
  const ungroupedItems: MenuItem[] = ungrouped
    .sort((a, b) => a.label.localeCompare(b.label, "ar"))
    .map((s) => ({ key: `sector:${s.key}`, label: s.label }));

  // 👇 No "القطاعات" root — return everything at top level
  return [...groupSubmenus, ...ungroupedItems];
}
