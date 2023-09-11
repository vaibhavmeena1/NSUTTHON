"use client"

import * as React from "react"
import {
  CaretSortIcon,
  ChevronDownIcon,
} from "@radix-ui/react-icons"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import axios from 'axios';

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"



export type Team = {
  team_id: number
  points: number
  team_name: string
}

// const sortedData = data.sort((a, b) => b.points - a.points);


export function Leaderboard() {
  const [teams, setTeams] = React.useState<Team[]>([]); // To store the fetched data
  const [sorting, setSorting] = React.useState<SortingState>([]);

  
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  
  const sortedTeams = React.useMemo(() => {
    return [...teams].sort((a, b) => b.points - a.points);
  }, [teams]);


    // fetch team data function
    const fetchTeamData = () => {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/teams`)
          .then(response => {
              setTeams(response.data);
          })
          .catch(error => {
              console.error('Error fetching team data:', error);
          });
  };

  // Fetch data using Axios when the component mounts
  React.useEffect(fetchTeamData, []); // calling fetchTeamData directly in useEffect

  // Define the columns for the table
 const columns: ColumnDef<Team>[] = [
  {
    id: "index",
    header: "#",
    cell: ({ row }) => {  return sortedTeams.findIndex(team => team.team_id === row.original.team_id) + 1;
    },    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "team_name",
    header: ({ column }) => {
      return (
        <Button  
          className="w-full text-right     "
          variant="ghost"
          
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Team Name
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="uppercase  text-center ">{row.getValue("team_name")}</div>,
  },
 
  {
    accessorKey: "points",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-full "
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Points
          <CaretSortIcon className="ml-2  h-4 w-4"  /> 
        </Button>
      )
    },
    cell: ({ row }) => {
      const points = parseFloat(row.getValue("points"))
      return <div className="flex  items-center  justify-center">{points}  
     
      </div> 
    },
    // defaultSortOrder: 'desc',
  },
  {
    accessorKey: "team_id",
    header: "Team ID",
    
    cell: ({ row }) => row.getValue("team_id"),
    
  },


]
  const table = useReactTable({
    data: sortedTeams, // Use the sortedTeams here
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter Teams..."
          value={(table.getColumn("team_name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("team_name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm uppercase mr-4"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
      </div>
    </div>
  )
}
