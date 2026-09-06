import { ProjectItem, ProjectCategory } from '@/types/project';

export interface PlacedProjectMarker {
  project: ProjectItem;
  position: [number, number, number];
  side: 'left' | 'right';
}

export interface FloorData {
  id: string;
  floorIndex: number;
  floorRoman: string;
  category: Exclude<ProjectCategory, 'All'>;
  projects: ProjectItem[];
  placedMarkers: PlacedProjectMarker[];
  corridorLength: number;
  entranceZ: number;
  portalForwardZ: number;
  portalBackZ: number;
}

const FLOOR_CATEGORIES: Exclude<ProjectCategory, 'All'>[] = [
  'Developer Tooling',
  'Fullstack Application',
  'Interactive UI / Creative',
  'Utility & System',
];

const ROMAN_NUMERALS = ['I', 'II', 'III', 'IV'];

export function buildFloorLayouts(
  projects: ProjectItem[],
  pairSpacing = 4,
  wallOffset = 4.2
): FloorData[] {
  return FLOOR_CATEGORIES.map((category, idx) => {
    const categoryProjects = projects.filter((p) => p.category === category);
    const pairsCount = Math.ceil(categoryProjects.length / 2);

    const placedMarkers: PlacedProjectMarker[] = categoryProjects.map((project, pIdx) => {
      const pairIndex = Math.floor(pIdx / 2);
      const isLeft = pIdx % 2 === 0;
      const x = isLeft ? -wallOffset : wallOffset;
      const z = -pairIndex * pairSpacing;

      return {
        project,
        position: [x, 0, z],
        side: isLeft ? 'left' : 'right',
      };
    });

    const minMarkerZ = -(pairsCount - 1) * pairSpacing;
    const portalForwardZ = minMarkerZ - 6;
    const entranceZ = 6;
    const portalBackZ = entranceZ + 4;

    const corridorLength = Math.max(28, portalBackZ - portalForwardZ + 6);

    return {
      id: `floor-${idx + 1}`,
      floorIndex: idx + 1,
      floorRoman: ROMAN_NUMERALS[idx] || `${idx + 1}`,
      category,
      projects: categoryProjects,
      placedMarkers,
      corridorLength,
      entranceZ,
      portalForwardZ,
      portalBackZ,
    };
  });
}