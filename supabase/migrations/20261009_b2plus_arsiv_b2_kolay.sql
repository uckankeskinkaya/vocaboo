-- Sınıf geri bildirimi: B2+ kelimeler çok zor -> arşive (lvl 5, oyunda hiçbir yerde çıkmaz, geri alınabilir).
-- B2'de yalnızca günlük hayatta sık kullanılan, bilinebilir 140 kelime kalır; diğerleri de arşive.
update public.words set lvl = 5 where lvl = 3;
update public.words set lvl = 5 where lvl = 2 and word not in ('achieve','adapt','analyse','appreciate','appropriate','architect','assume','attitude','authority','awkward','bargain','bold','brief','chaos','clarify','coincidence','commit','complex','compromise','conclude','conscious','consequence','consistent','consumer','context','contrast','contribute','convenient','convince','cooperate','cope','crucial','decline','demanding','demonstrate','deny','detect','dilemma','discipline','diverse','diversity','dominate','doubt','dynamic','eliminate','emerge','emphasis','enable','encounter','ensure','equip','establish','evolve','exceed','exclude','expose','external','fierce','flaw','frustrate','fundamental','gradual','harmony','harsh','hospitality','identical','identity','illusion','illustrate','immense','inevitable','insight','inspire','intense','interfere','interpret','isolate','justify','keen','maintain','mandatory','migrate','minority','modify','monitor','negotiate','neutral','objective','obstacle','occasional','opponent','outcome','outline','overall','overcome','overlook','overwhelm','perspective','potential','precise','priority','quote','random','rational','reliable','reluctant','represent','resolve','restore','restrict','revise','rural','sacrifice','seek','shift','significant','sincere','slogan','spectacular','statistic','strategy','submit','sufficient','survey','sustainable','sympathy','tendency','tone','transform','trigger','triumph','urban','vague','valid','vary','vast','visible','voluntary','vulnerable','widespread');

-- Seri modu: artık 3 seviye (B1, B1+, B2); skor arttıkça zorlaşır.
create or replace function public.pick_lvl(sc integer)
 returns integer language plpgsql set search_path to 'public' as $$
declare t numeric := least(sc/1200.0, 1); a numeric[] := array[55,32,13]; b numeric[] := array[15,35,50]; w numeric[3]; r numeric; i int;
begin
  for i in 1..3 loop w[i] := a[i]*(1-t) + b[i]*t; end loop;
  r := random() * (w[1]+w[2]+w[3]);
  for i in 1..3 loop r := r - w[i]; if r <= 0 then return i-1; end if; end loop;
  return 2;
end $$;

-- Günlük kelime: B1+ ve B2 (kolay) arasından.
create or replace function public.daily_word(d date)
 returns integer language plpgsql security definer set search_path to 'public' as $$
declare w int;
begin
  select word_id into w from daily_pick where day = d;
  if w is null then
    select id into w from words where lvl between 1 and 2 order by md5(id::text || d::text || 'vb-d-7q2k') limit 1;
    insert into daily_pick(day, word_id) values (d, w) on conflict (day) do nothing;
    select word_id into w from daily_pick where day = d;
  end if;
  return w;
end $$;

-- Arena "Karışık": seviye 0-2 arasından.
do $$ begin
  execute replace(pg_get_functiondef('public.a_host'::regproc), 'floor(random() * 4)::int', 'floor(random() * 3)::int');
end $$;
