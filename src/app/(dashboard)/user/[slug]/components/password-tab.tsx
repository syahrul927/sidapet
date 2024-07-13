"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import TogglePassword from "~/components/auth/toggle-password";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";

interface PasswordTabProps {
  id: string;
}

const passwordFormSchema = z
  .object({
    password: z.string({ required_error: "Kata sandi wajib di isi" }).min(6, {
      message: "Kata sandi minimal 6 karakter",
    }),
    repassword: z.string({ required_error: "Kata sandi wajib di isi" }).min(6, {
      message: "Kata sandi minimal 6 karakter",
    }),
  })
  .refine((data) => data.password === data.repassword, {
    message: "Kata sandi tidak sesuai",
    path: ["repassword"],
  });

type PasswordFormValues = z.infer<typeof passwordFormSchema>;
const defaultValues: Partial<PasswordFormValues> = {};

const PasswordTab = ({ id }: PasswordTabProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const form = useForm<PasswordFormValues>({
    defaultValues,
    resolver: zodResolver(passwordFormSchema),
  });
  const { isPending, mutate } = api.user.changePassword.useMutation({
    onSuccess: () => {
      toast({
        title: "Sukses",
        description: "Password berhasil diganti!",
      });
      form.reset();
    },
    onError: (e) => {
      toast({
        title: "Gagal",
        variant: "destructive",
        description: e.message,
      });
    },
  });
  const onSubmit = (props: PasswordFormValues) => {
    mutate({
      id,
      password: props.password,
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Ganti Kata Sandi</CardTitle>
                <TogglePassword
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />
              </div>
              <CardDescription>
                Area berbahaya untuk mengelola password akun. Kamu dapat
                mengganti kata sandi disini.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Ganti kata sandi baru"
                        type={showPassword ? "text" : "password"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="repassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Ketik ulang kata sandi baru"
                        type={showPassword ? "text" : "password"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant={"ghost"}
                  disabled={!form.formState.isDirty || isPending}
                  onClick={() => form.reset()}
                >
                  Reset
                </Button>
                <Button disabled={!form.formState.isDirty || isPending}>
                  Simpan
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
      <DeleteAccount id={id} />
    </div>
  );
};
export default PasswordTab;

interface DeleteAccountProps {
  id: string;
}
const DeleteAccount = ({ id }: DeleteAccountProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const { mutate } = api.user.delete.useMutation({
    onSuccess: () => {
      toast({
        title: "Sukses",
        description: "Berhasil hapus user",
      });
      router.push("/user");
    },
    onError: (e) => {
      toast({
        title: "Gagal",
        variant: "destructive",
        description: e.message,
      });
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"destructiveOutline"}>Hapus Akun</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah kamu yakin?</AlertDialogTitle>
          <AlertDialogDescription>
            Hapus akun tidak dapat dikembalikan. Pastikan akun yang ingin kamu
            hapus benar!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction variant={"destructive"} onClick={() => mutate(id)}>
            Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
