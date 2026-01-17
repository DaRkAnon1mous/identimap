import { useState } from 'react';
import { Users, Plus, Clock, Shield, AlertCircle, Pencil, Trash2, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { mockFamilyMembers as initialMembers } from '@/data/mockData';
import { FamilyMember } from '@/types';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const familyMemberSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
  relationship: z.enum(['Spouse', 'Parent', 'Sibling', 'Child', 'Other'], { required_error: 'Please select a relationship' }),
  accessLevel: z.enum(['full', 'limited', 'emergency'], { required_error: 'Please select an access level' }),
  expiresAt: z.string().min(1, 'Please select an expiry date'),
});

type FormData = z.infer<typeof familyMemberSchema>;

const emptyFormData: FormData = {
  name: '',
  relationship: '' as any,
  accessLevel: '' as any,
  expiresAt: '',
};

export function FamilyAccess() {
  const [members, setMembers] = useState<FamilyMember[]>(initialMembers);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [formData, setFormData] = useState<FormData>(emptyFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const { toast } = useToast();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success/10 text-success border-success/30';
      case 'pending': return 'bg-warning/10 text-warning border-warning/30';
      case 'expired': return 'bg-destructive/10 text-destructive border-destructive/30';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getAccessLevelIcon = (level: string) => {
    switch (level) {
      case 'full': return <Shield className="w-4 h-4 text-primary" />;
      case 'limited': return <Clock className="w-4 h-4 text-info" />;
      case 'emergency': return <AlertCircle className="w-4 h-4 text-warning" />;
      default: return null;
    }
  };

  const resetForm = () => {
    setFormData(emptyFormData);
    setErrors({});
  };

  const validateForm = (): boolean => {
    const result = familyMemberSchema.safeParse(formData);
    if (!result.success) {
      const newErrors: Partial<Record<keyof FormData, string>> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) {
          newErrors[err.path[0] as keyof FormData] = err.message;
        }
      });
      setErrors(newErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleAddMember = () => {
    if (!validateForm()) return;

    const newMember: FamilyMember = {
      id: Date.now().toString(),
      name: formData.name.trim(),
      relationship: formData.relationship,
      accessLevel: formData.accessLevel,
      expiresAt: new Date(formData.expiresAt),
      status: 'pending',
    };

    setMembers(prev => [...prev, newMember]);
    setIsAddDialogOpen(false);
    resetForm();
    toast({
      title: 'Request Sent',
      description: `Access request sent to ${newMember.name}. Awaiting approval.`,
    });
  };

  const handleEditMember = () => {
    if (!validateForm() || !selectedMember) return;

    setMembers(prev => prev.map(member => 
      member.id === selectedMember.id
        ? {
            ...member,
            name: formData.name.trim(),
            relationship: formData.relationship,
            accessLevel: formData.accessLevel,
            expiresAt: new Date(formData.expiresAt),
          }
        : member
    ));
    setIsEditDialogOpen(false);
    setSelectedMember(null);
    resetForm();
    toast({
      title: 'Member Updated',
      description: 'Family member access has been updated successfully.',
    });
  };

  const handleDeleteMember = () => {
    if (!selectedMember) return;

    setMembers(prev => prev.filter(member => member.id !== selectedMember.id));
    setIsDeleteDialogOpen(false);
    toast({
      title: 'Access Revoked',
      description: `${selectedMember.name}'s access has been removed.`,
      variant: 'destructive',
    });
    setSelectedMember(null);
  };

  const openEditDialog = (member: FamilyMember) => {
    setSelectedMember(member);
    setFormData({
      name: member.name,
      relationship: member.relationship as FormData['relationship'],
      accessLevel: member.accessLevel,
      expiresAt: member.expiresAt.toISOString().split('T')[0],
    });
    setErrors({});
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (member: FamilyMember) => {
    setSelectedMember(member);
    setIsDeleteDialogOpen(true);
  };

  const openAddDialog = () => {
    resetForm();
    setIsAddDialogOpen(true);
  };

  const FormFields = ({ isEdit = false }: { isEdit?: boolean }) => (
    <div className="space-y-4 pt-4">
      <div className="space-y-2">
        <Label htmlFor={isEdit ? 'edit-name' : 'name'}>Full Name</Label>
        <Input 
          id={isEdit ? 'edit-name' : 'name'}
          placeholder="Enter family member's name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className={errors.name ? 'border-destructive' : ''}
          maxLength={100}
        />
        {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor={isEdit ? 'edit-relationship' : 'relationship'}>Relationship</Label>
        <Select 
          value={formData.relationship}
          onValueChange={(value) => setFormData(prev => ({ ...prev, relationship: value as FormData['relationship'] }))}
        >
          <SelectTrigger className={errors.relationship ? 'border-destructive' : ''}>
            <SelectValue placeholder="Select relationship" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Spouse">Spouse</SelectItem>
            <SelectItem value="Parent">Parent</SelectItem>
            <SelectItem value="Sibling">Sibling</SelectItem>
            <SelectItem value="Child">Child</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
        {errors.relationship && <p className="text-sm text-destructive">{errors.relationship}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor={isEdit ? 'edit-access' : 'access'}>Access Level</Label>
        <Select 
          value={formData.accessLevel}
          onValueChange={(value) => setFormData(prev => ({ ...prev, accessLevel: value as FormData['accessLevel'] }))}
        >
          <SelectTrigger className={errors.accessLevel ? 'border-destructive' : ''}>
            <SelectValue placeholder="Select access level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="full">Full Access</SelectItem>
            <SelectItem value="limited">Limited Access</SelectItem>
            <SelectItem value="emergency">Emergency Only</SelectItem>
          </SelectContent>
        </Select>
        {errors.accessLevel && <p className="text-sm text-destructive">{errors.accessLevel}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor={isEdit ? 'edit-expiry' : 'expiry'}>Access Expiry</Label>
        <Input 
          id={isEdit ? 'edit-expiry' : 'expiry'}
          type="date"
          value={formData.expiresAt}
          onChange={(e) => setFormData(prev => ({ ...prev, expiresAt: e.target.value }))}
          min={new Date().toISOString().split('T')[0]}
          className={errors.expiresAt ? 'border-destructive' : ''}
        />
        {errors.expiresAt && <p className="text-sm text-destructive">{errors.expiresAt}</p>}
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <Users className="w-7 h-7 text-primary" />
            Family Access
          </h2>
          <p className="text-muted-foreground mt-1">
            Manage time-bound access for trusted family members
          </p>
        </div>

        <Button className="gap-2" onClick={openAddDialog}>
          <Plus className="w-4 h-4" />
          Add Member
        </Button>
      </div>

      {members.length === 0 ? (
        <Card className="glass-card">
          <CardContent className="p-8 text-center">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">No Family Members</h3>
            <p className="text-muted-foreground mb-4">
              Add trusted family members to grant them access to your data.
            </p>
            <Button onClick={openAddDialog} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Your First Member
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {members.map((member, index) => (
            <Card 
              key={member.id} 
              className="glass-card hover-lift"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-lg font-semibold text-primary">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">{member.relationship}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 text-sm">
                      {getAccessLevelIcon(member.accessLevel)}
                      <span className="capitalize">{member.accessLevel} Access</span>
                    </div>
                    <Badge variant="outline" className={cn(getStatusColor(member.status))}>
                      {member.status}
                    </Badge>
                    <div className="text-sm text-muted-foreground">
                      Expires: {member.expiresAt.toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => openEditDialog(member)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => openDeleteDialog(member)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add Member Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="glass-card">
          <DialogHeader>
            <DialogTitle>Add Family Member</DialogTitle>
            <DialogDescription>
              Grant time-bound access to a trusted family member. Access requests require approval.
            </DialogDescription>
          </DialogHeader>
          <FormFields />
          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="flex-1" onClick={handleAddMember}>
              Send Request
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Member Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="glass-card">
          <DialogHeader>
            <DialogTitle>Edit Family Member</DialogTitle>
            <DialogDescription>
              Update access settings for {selectedMember?.name}.
            </DialogDescription>
          </DialogHeader>
          <FormFields isEdit />
          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="flex-1" onClick={handleEditMember}>
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="glass-card">
          <AlertDialogHeader>
            <AlertDialogTitle>Revoke Access</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to revoke {selectedMember?.name}'s access? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteMember}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Revoke Access
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
