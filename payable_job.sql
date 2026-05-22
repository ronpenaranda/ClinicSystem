create or replace function generate_ionics_payables()
returns void
language plpgsql
as $$
declare
  emp record;
  new_payable_id uuid;
begin

  for emp in
    select distinct employee_id
    from treatments
    where payment_status = 'FOR PAYABLE'
      and payable_id is null
  loop

    insert into payables (
      employee_id,
      coverage_start,
      coverage_end,
      status,
      generated_at
    )
    values (
      emp.employee_id,
      now() - interval '15 days',
      now(),
      'UNPAID',
      now()
    )
    returning id into new_payable_id;

    insert into payable_items (
      payable_id,
      treatment_id,
      amount
    )
    select
      new_payable_id,
      id,
      remaining_balance
    from treatments
    where employee_id = emp.employee_id
      and payment_status = 'FOR PAYABLE'
      and payable_id is null;

    update treatments
    set payable_id = new_payable_id
    where employee_id = emp.employee_id
      and payment_status = 'FOR PAYABLE'
      and payable_id is null;

  end loop;

end;
$$;