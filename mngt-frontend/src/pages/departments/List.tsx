import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { ShowButton } from "@/components/refine-ui/buttons/show";
import { useTable } from "@refinedev/react-table";

//components
import { ListView } from "@/components/refine-ui/views/list-view";
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CreateButton } from "@/components/refine-ui/buttons/create";
import { DataTable } from "@/components/refine-ui/data-table/data-table";

type DepartmentListItem = {
    id: number;
    name: string;
    code?: string | null;
    description?: string | null;
    totalSubjects?: number | null;
};

const DepartmentList = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const departmentColumns = useMemo<ColumnDef<DepartmentListItem>[]>(
        () => [
            /*Code Column */
            {
                id: "code",
                accessorKey: "code",
                size: 120,
                header: () => <p className="column-title ml-2">Code</p>,
                cell: ({ getValue }) => {
                    const code = getValue<string>();
                    return code ? (
                        <Badge>{code}</Badge>
                    ) : (
                        <span className="text-muted-foreground ml-2">No code</span>
                    );
                },
            },
            /*Name Column */
            {
                id: "name",
                accessorKey: "name",
                size: 220,
                header: () => <p className="column-title">Name</p>,
                cell: ({ getValue }) => (
                    <span className="text-foreground">{getValue<string>()}</span>
                ),
                filterFn: "includesString",
            },
            /*Total Subjects column */
            {
                id: "totalSubjects",
                accessorKey: "totalSubjets",
                size: 160,
                header: () => <p className="column-title">Subjects</p>,
                cell: ({ getValue }) => {
                    const total = getValue<number>();
                    return <Badge variant="secondary" >{total ?? 0}</Badge>
                }
            },
            /*Description */
            {
                id: "description",
                accessorKey: "description",
                size: 320,
                header: () => <p className="column-title" >Description</p>,
                cell: ({ getValue }) => {
                    const description = getValue<string>();
                    return description ? (
                        <span className="truncate line-clamp-2" >{description}</span>
                    ) : (
                        <span className="text-muted-foreground">No description</span>
                    );
                }
            },
            /*Details column */
            {
                id: "details",
                size: 140,
                header: () => <p className="column-title">Details</p>,
                cell: ({ row }) => (
                    <ShowButton
                        resource="departments"
                        recordItemId={row.original.id}
                        variant="outline"
                        size="sm"
                    >
                        View
                    </ShowButton>
                )
            }
        ],
        []
    );

    /*FIlters */
    const searchFilters = searchQuery ? [
        {
            field: "name",
            operator: "contains" as const,
            value: searchQuery
        },
        {
            field: "code",
            operator: "contains" as const,
            value: searchQuery
        },
    ] :
        [];

    const departmentsTable = useTable<DepartmentListItem>({
        columns: departmentColumns,
        refineCoreProps: {
            resource: "departments",
            pagination: {
                pageSize: 10,
                mode: "server",
            },
            filters: {
                permanent: [...searchFilters],
            },
            sorters: {
                initial: [
                    {
                        field: "id",
                        order: "desc"
                    }
                ]
            }
        }
    });

    return (
        <ListView>
            <Breadcrumb />
            <h1 className="page-title">Departments</h1>

            <div className="intro-row">
                <p> Quick access to essential metrics and management tools.</p>

                <div className="action-row">
                    <div className="search-field">
                        <Search className="search-icon" />
                        <Input
                            type="text"
                            placeholder="Search by name or code..."
                            className="pl-10 w-full"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <CreateButton resource="departments" />
                </div>
            </div>
            <DataTable table={departmentsTable} />
        </ListView>
    )
}

export default DepartmentList
