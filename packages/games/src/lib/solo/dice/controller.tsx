import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  cn,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  NumberInput,
  Icons,
} from "@winrlabs/ui";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

export interface RangeControllerProps {
  winMultiplier: number;
  disabled?: boolean;
}

const formSchema = z.object({
  rollValue: z.number().min(5).max(95),
  rollType: z.enum(["OVER", "UNDER"]),
  winChance: z.number().min(5).max(95),
});

export const Controller: React.FC<RangeControllerProps> = ({
  winMultiplier,
  disabled,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema, {
      async: true,
    }),
    mode: "onSubmit",
    defaultValues: {
      rollType: "OVER",
      rollValue: 50,
      winChance: 50,
    },
  });

  useEffect(() => {
    form.watch((values) => {
      console.log(values);
    });
  }, []);

  return (
    <Form {...form}>
      <div className="relative flex w-full shrink-0 items-end justify-center gap-2 ">
        <FormField
          control={form.control}
          name="rollValue"
          render={({ field }) => (
            <FormItem className="mb-0 max-w-[148px]">
              <FormControl>
                <NumberInput.Root
                  {...field}
                  isDisabled={disabled}
                  onChange={(val) => {
                    field.onChange(val);

                    const { rollType } = form.getValues();

                    const newValue = rollType === "UNDER" ? val : 100 - val;

                    form.setValue("winChance", newValue, {
                      shouldValidate: true,
                    });
                  }}
                >
                  <FormLabel className="justify-center text-zinc-400">
                    Roll{" "}
                    {form.getValues().rollType === "OVER" ? "Over" : "Under"}
                  </FormLabel>
                  <NumberInput.Container
                    className={cn(
                      "rounded-md border border-zinc-600 bg-zinc-950 py-[10px]"
                    )}
                  >
                    <NumberInput.Input
                      decimalScale={2}
                      className={cn(
                        "border-none bg-transparent px-2 py-2 text-center font-semibold leading-5 outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                      )}
                    />
                  </NumberInput.Container>
                </NumberInput.Root>
              </FormControl>
              <FormMessage className="absolute left-2 top-20" />
            </FormItem>
          )}
        />

        <Button
          variant={"success"}
          size={"sm"}
          type="button"
          className="mb-1 h-10 w-10 shrink-0 bg-lime-600 p-0 hover:bg-lime-700"
          onClick={() => {
            const { rollType, winChance } = form.getValues();

            const newRollType = rollType === "OVER" ? "UNDER" : "OVER";

            form.setValue("rollType", newRollType, {
              shouldValidate: true,
            });

            form.setValue("winChance", 100 - winChance, {
              shouldValidate: true,
            });
          }}
          disabled={form.formState.isSubmitting || form.formState.isLoading}
        >
          <Icons.IconChevronUp
            className={cn("h-5 w-5 text-zinc-100 transition-all duration-300", {
              ["rotate-180 transform"]: form.getValues().rollType === "UNDER",
            })}
          />
        </Button>
        <FormField
          control={form.control}
          name="winChance"
          render={({ field }) => (
            <FormItem className="mb-0 max-w-[148px]">
              <FormControl>
                <NumberInput.Root
                  {...field}
                  isDisabled={
                    form.formState.isSubmitting || form.formState.isLoading
                  }
                  onChange={(val) => {
                    field.onChange(val);

                    const { rollType } = form.getValues();

                    const newValue = rollType === "UNDER" ? val : 100 - val;

                    form.setValue("rollValue", newValue, {
                      shouldValidate: true,
                    });
                  }}
                >
                  <FormLabel className="justify-center text-center text-zinc-400">
                    Win Chance
                  </FormLabel>
                  <NumberInput.Container
                    className={cn(
                      " rounded-md border border-zinc-600 bg-zinc-950 py-[10px] text-center"
                    )}
                  >
                    <NumberInput.Input
                      decimalScale={2}
                      className={cn(
                        "border-none bg-transparent px-2 py-2 text-center font-semibold leading-5 outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                      )}
                    />
                    <div className="absolute right-2  flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-zinc-600">
                      <span className="text-xs">%</span>
                    </div>
                  </NumberInput.Container>
                </NumberInput.Root>
              </FormControl>
              <FormMessage className="absolute left-2 top-20" />
            </FormItem>
          )}
        />

        <div className="w-[140px]">
          <FormLabel className="justify-center text-zinc-400">
            Multiplier
          </FormLabel>
          <div className="mb-1 flex h-10 w-full flex-shrink-0 items-center justify-center rounded-lg bg-zinc-600 px-2 py-[10px] text-center font-bold">
            x{winMultiplier}
          </div>
        </div>
      </div>
    </Form>
  );
};
