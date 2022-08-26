import { useContext } from "react";

import { HandPalm, Play } from "phosphor-react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import {
  HomeContainer,
  StartContdownButton,
  StopContdownButton,
} from "./styles";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import { CycleContext } from "../../context/CyclesContext";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "informe a tarefa"),
  minutesAmount: zod.number().min(5).max(60),
});

type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export const Home = () => {
  const { activeCycle, CreateNewCycle, InterrupCurrentCycle } =
    useContext(CycleContext);

  const newCycleForm = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const { reset, handleSubmit, watch } = newCycleForm;

  const handleCreateNewCycle = (data: newCycleFormData) => {
    CreateNewCycle(data);
    reset();
  };

  const task = watch("task");
  const minutesAmount = watch("minutesAmount");

  const isSubmitDisabled = !task || !minutesAmount;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />
        {activeCycle ? (
          <StopContdownButton onClick={InterrupCurrentCycle} type="button">
            <HandPalm size={24} /> Interromper
          </StopContdownButton>
        ) : (
          <StartContdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} /> Começar
          </StartContdownButton>
        )}
      </form>
    </HomeContainer>
  );
};
