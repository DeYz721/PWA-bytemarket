-- Agrega el texto completo de cada tutorial a la tabla de guías.
-- Ya está aplicado en el proyecto Bytemarket de Supabase; se guarda aquí como referencia.
alter table public.guias add column if not exists contenido text not null default '';
comment on column public.guias.contenido is 'Texto completo del tutorial en formato Markdown sencillo (##, ###, listas, **negritas**).';
