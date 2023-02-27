import expose from "./expose";

expose("data", (bind) => {
  bind.invoker("status");
  bind.invoker("members");

  return bind;
});

expose("public", (bind) => {
  bind.invoker("login");
  bind.invoker("getStaffName");

  return bind;
});
