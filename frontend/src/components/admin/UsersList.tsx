
import React from "react";
import { Button } from "../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";
import { Edit, Trash2, UserCog } from "lucide-react";
import { toast } from "../../components/ui/use-toast";

// Mock user data
const mockUsers = [
  { id: "1", name: "Admin User", email: "admin@example.com", role: "admin" },
  { id: "2", name: "Regular User", email: "user@example.com", role: "user" },
  { id: "3", name: "Alice Johnson", email: "alice@example.com", role: "admin" },
  { id: "4", name: "Bob Smith", email: "bob@example.com", role: "user" },
  { id: "5", name: "Charlie Davis", email: "charlie@example.com", role: "user" },
  { id: "6", name: "Diana Miller", email: "diana@example.com", role: "user" },
  { id: "7", name: "Edward Wilson", email: "edward@example.com", role: "user" },
  { id: "8", name: "Fiona Brown", email: "fiona@example.com", role: "user" },
];

const UsersList = () => {
  const handleEdit = (id: string) => {
    // In a real app, you would navigate to edit user page
    toast({
      title: "Edit user",
      description: `Editing user with ID: ${id}`,
    });
  };
  
  const handleDelete = (id: string) => {
    // In a real app, you would call an API to delete the user
    toast({
      title: "User deleted",
      description: "The user has been deleted successfully.",
    });
    // For now we'll just show a toast as we're using mock data
  };
  
  const handleChangeRole = (id: string, currentRole: string) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    // In a real app, you would call an API to update the user's role
    toast({
      title: "Role updated",
      description: `User role changed to ${newRole}.`,
    });
  };

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="w-[120px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">
                {user.name}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge variant={user.role === "admin" ? "default" : "outline"}>
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button size="icon" variant="ghost" onClick={() => handleChangeRole(user.id, user.role)}>
                    <UserCog className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => handleEdit(user.id)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="text-red-500" onClick={() => handleDelete(user.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersList;
