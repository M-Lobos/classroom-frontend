import { Subject } from "@/types/types";

export const MOCK_SUBJECTS: Subject[] = [
    {
        id: 1,
        code: "CSCI-2101",
        name: "Data Structures and Algorithms",
        department: "CS",
        description: "An introduction to core computational structures including linked lists, trees, graphs, and hash tables, alongside efficiency analysis using Big O notation.",
        createdAt: new Date().toISOString()
    },
    {
        id: 2,
        code: "MATH-3302",
        name: "Math",
        department: "Math",
        description: "Covers vector spaces, linear transformations, matrices, eigenvalues, and multi-variable integration with applications to physical systems.",
        createdAt: new Date().toISOString()
    },
    {
        id: 3,
        code: "EN-1105",
        name: "English XIX century Literature",
        department: "English",
        description: "A foundational course covering Newtonian mechanics, conservation laws, rotational dynamics, and oscillatory motion for science and engineering majors.",
        createdAt: new Date().toISOString()
    },
    {
        id: 4,
        code: "PHYS-1105",
        name: "Phyics",
        department: "Ciencice",
        description: "A foundational course covering Newtonian mechanics, conservation laws, rotational dynamics, and oscillatory motion for science and engineering majors.",
        createdAt: new Date().toISOString()
    }
];