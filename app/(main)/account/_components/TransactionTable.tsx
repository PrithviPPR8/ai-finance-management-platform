"use client";

import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { format } from "date-fns";
import { categoryColors } from "@/data/categories.js"
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, Clock, MoreHorizontal, RefreshCw, Search, Trash, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

type Transaction = {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  isRecurring: boolean;
  recurringInterval: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
};

const RECURRING_INTERVALS = {
    DAILY: "Daily",
    WEEKLY: "Weekly",
    MONTHLY: "Monthly",
    YEARLY: "Yearly",

}

const TransactionTable = ({ transactions }: {transactions: any}) => {

  const router = useRouter();

  const [selectedIds, setSelectedIds] = useState<any[]>([]);
  const [sortConfig, setSortConfig] = useState({
    field: "date",
    direction: "desc",
  })

//   console.log(selectedIds);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [recurringFilter, setRecurringFilter] = useState("");

  const filteredAndSortedTransactions = transactions;

  const handleSort = (field: any) => {
    setSortConfig(current => ({
        field,
        direction: current.field == field && current.direction === "asc" ? "desc" : "asc"
    }))
  }

  const handleSelect = (id: any) => {
    setSelectedIds(current => current.includes(id) 
    ? current.filter(item => item!=id) 
    : [...current, id])
  }

  const handleSelectAll = () => {
    setSelectedIds((current) => 
        current.length === filteredAndSortedTransactions.length 
        ? []
        : filteredAndSortedTransactions.map((t: Transaction) => t.id)
    )
  }
  
  const handleBulkDelete = () => {

  }

  const handleClearFilters = () => {
    setSearchTerm("");
    setTypeFilter("");
    setRecurringFilter("");
    setSelectedIds([]);
  }

  return (
    <div className="space-y-4">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                    className="pl-8 " 
                    placeholder="Search Transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="flex gap-2">
                <Select value={typeFilter} onValueChange={setTypeFilter} >
                    <SelectTrigger>
                        <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="INCOME">Income</SelectItem>
                        <SelectItem value="EXPENSE">Expense</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={recurringFilter} onValueChange={(value) => setRecurringFilter(value)} >
                    <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="All Transactions" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="recurring">Recurring Only</SelectItem>
                        <SelectItem value="non-recurring">Non-Recurring Only</SelectItem>
                    </SelectContent>
                </Select>

                {selectedIds.length > 0 && (
                    <div className="flex items-center gap-2">
                        <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
                            <Trash className="h-4 w-4 mr-1" />
                            Delete Selected ({selectedIds.length})
                        </Button>    
                    </div>
                )}

                {(searchTerm || typeFilter || recurringFilter) && (
                    <Button 
                        variant="outline" 
                        size="icon"
                        onClick={handleClearFilters}
                        title="Clear Filters"
                    >
                        <X className="h-4 w-5" />
                    </Button>
                )}
            </div>
        </div>

        {/* Transactions */}
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[50px]">
                        <Checkbox 
                            onCheckedChange={handleSelectAll} 
                            checked={
                                selectedIds.length === 
                                    filteredAndSortedTransactions.length &&
                                    filteredAndSortedTransactions.length > 0
                            }
                        />
                    </TableHead>
                    <TableHead 
                        className="cursor-pointer"
                        onClick={() => handleSort("date")}
                    >
                        <div className="flex items-center">
                            Date {sortConfig.field === "date" && (
                                sortConfig.direction === "asc" 
                                ? <ChevronUp className="ml-1 h-4 w-4" /> 
                                : <ChevronDown className="ml-1 h-4 w-4" />
                            )}
                        </div>
                    </TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead 
                        className="cursor-pointer"
                        onClick={() => handleSort("category")}
                    >
                        <div className="flex items-center">
                            Category
                            {sortConfig.field === "category" && (
                                sortConfig.direction === "asc" 
                                ? <ChevronUp className="ml-1 h-4 w-4" /> 
                                : <ChevronDown className="ml-1 h-4 w-4" />
                            )}
                        </div>
                    </TableHead>
                    <TableHead 
                        className="cursor-pointer"
                        onClick={() => handleSort("amount")}
                    >
                        <div className="flex items-center justify-end">
                            Amount
                            {sortConfig.field === "amount" && (
                                sortConfig.direction === "asc" 
                                ? <ChevronUp className="ml-1 h-4 w-4" /> 
                                : <ChevronDown className="ml-1 h-4 w-4" />
                            )}
                        </div>
                    </TableHead>
                    <TableHead>Recurring</TableHead>
                    <TableHead className="w-[50px]" />
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredAndSortedTransactions.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center text-muted-foreground">
                                No Transactions Found
                            </TableCell>
                        </TableRow>
                    ): (
                        filteredAndSortedTransactions.map((transaction: Transaction) => (
                            <TableRow key={transaction.id}>
                            <TableCell> 
                                <Checkbox 
                                    onCheckedChange={() => handleSelect(transaction.id)} 
                                    checked={selectedIds.includes(transaction.id)}
                                /> 
                            </TableCell>
                            <TableCell> {format(new Date(transaction.date), "PP")} </TableCell>
                            <TableCell> {transaction.description} </TableCell>
                            <TableCell className="capitalize"> 
                                <span style={{
                                    background: categoryColors[transaction.category],
                                }}
                                    className="px-2 py-1 rounded text-white text-cm"
                                >
                                    {transaction.category} 
                                </span>
                            </TableCell>
                            <TableCell 
                                className="text-right font-medium"
                                style={{
                                    color: transaction.type === "EXPENSE" ? "red" : "green",
                                }}
                            >
                                {transaction.type === "EXPENSE" ? "-" : "+"}$
                                ${transaction.amount.toFixed(2)}
                            </TableCell>
                            <TableCell>
                                {transaction.isRecurring ? (
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Badge variant={"outline"} className="gap-1 bg-purple-100 text-purple-700 hover:bg-purple-200">
                                                <RefreshCw className="h-3 w-3" />
                                                {RECURRING_INTERVALS[
                                                    transaction.recurringInterval
                                                ]}
                                            </Badge>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <div className="text-sm">
                                                <div className="font-medium">Next Date:</div>
                                                <div>
                                                    {format(new Date(transaction.date), "PP")}
                                                </div>
                                            </div>
                                        </TooltipContent>
                                    </Tooltip>
                                ): <Badge variant={"outline"} className="gap-1">
                                        <Clock className="h-3 w-3" />
                                        One-Time
                                    </Badge>}
                            </TableCell>

                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant={"ghost"} className="h-8 w-8 p-0"> 
                                            <MoreHorizontal className="h-4 w-4" /> 
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel onClick={() => router.push(
                                            `/transaction/create?edit=${transaction.id}`
                                        )}>
                                            Edit
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem 
                                            className="text-destructive"
                                            // onClick={() => deleteFn([transaction.id])}
                                        >
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    </div>
  )
}

export default TransactionTable