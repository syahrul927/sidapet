"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
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

const userFormSchema = z
  .object({
    email: z
      .string({ required_error: "Email wajib di isi" })
      .email("Format email belum sesuai"),
    name: z.string({ required_error: "Nama Lengkap wajib di isi" }),
    phoneNumber: z
      .string({ required_error: "Nomor Telepon wajib di isi" })
      .regex(/^08[1-9][0-9]{7,10}$/, "Nomor Telepon tidak sesuai format"),
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
type UserFormValues = z.infer<typeof userFormSchema>;

const defaultValues: Partial<UserFormValues> = {};

const UserForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { mutate, isPending } = api.user.registerUser.useMutation({
    onSuccess: () => {
      toast({
        title: "Sukses",
        description: "User berhasil disimpan!",
      });

      void router.push("/user");
    },
    onError: (e) => {
      toast({
        title: "Gagal",
        variant: "destructive",
        description: e.message,
      });
    },
  });

  const form = useForm<UserFormValues>({
    defaultValues,
    resolver: zodResolver(userFormSchema),
  });
  const onSubmit = (props: UserFormValues) => {
    mutate({
      ...props,
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex max-w-xl flex-col gap-3">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Akun</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 ">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Nama Lengkap" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Nomor Telepon" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Kata Sandi</CardTitle>
                <Button
                  variant={"link"}
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"} Password
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Kata sandi"
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
                        placeholder="Ketik ulang kata sandi"
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
                  variant={"ghost"}
                  type="button"
                  onClick={() => void router.back()}
                  disabled={isPending}
                >
                  Batal
                </Button>
                <Button disabled={isPending}>Simpan</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </Form>
  );
};
export default UserForm;
