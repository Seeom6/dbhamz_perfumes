import { useLocation } from "react-router-dom";
import dbhamz1 from "/assets/dbhamz1.png";
import dbhamz2 from "/assets/dbhamz2.png";

const AboutUs = () => {
  const pathname = useLocation().pathname;
  return (
    <div className="w-full  flex flex-col lg:flex-row gap-2.5 px-1.5">
      <div className="w-full flex flex-col">
        <div className="w-full flex justify-center mb-7 relative">
          <span className="absolute w-full h-0.5 md:h-1 left-0 top-[12px] lg:top-7 bg-primary"></span>
          <p className="titleText z-10 font-bold px-5 bg-white text-primary">
            من نحن{" "}
          </p>
        </div>
        {pathname === "/" ? (
          <p className="text-medium tracking-widest font-semibold leading-9 text-ford">
            في قلب الخليج، حيث تمتزج الفخامة مع الأصالة، انطلقت رحلتنا لنروي
            قصصالعطر الفريدة. نحن في دبهامز نؤمن بأن كل نفحة عطر تحكي حكاية،
            وكلزجاجة تحمل بين طياتها ذكرى خالدة. رسالتنا هي تقديم تجارب
            عطريةاستثنائية تجمع بين عبق التراث العربي وأرقى الابتكارات العالمية.
            نختارمكوناتنا بعناية فائقة، من الزهور النادرة إلى العود الفاخر،
            لتمنحكلحظات لا تُنسى تعبق بالسحر والتألق. مع دبهامز، نفتح لك أبواب
            عالم منالروائح الفاخرة التي تجسد شخصيتك وتُبرز ذوقك الرفيع.
            رائحتك... هي .بصمتك
          </p>
        ) : (
          <div className="w-full text-medium text-ford flex flex-col gap-8 justify-center items-center ">
            <h3>
              ✨ "لمسة عطر... قصة شغف وأناقة تُروى بعبير خاص" في دبهامز، نؤمن أن
              العطر هو أكثر من مجرد رائحة؛ إنه انعكاس لشخصيتك وقصة تُروى دون
              كلمات.
            </h3>
            <div>
              <h3 className="font-semibold text-sm md:text-xl text-black">
                رؤيتنا ورسالتنا
              </h3>
              <p>
                نسعى لتقديم تجارب عطرية استثنائية تجمع بين الفخامة والأصالة،
                مستوحاة من جمال الطبيعة وثقافة الشرق الأوسط الغنية.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-sm md:text-xl text-black">
                قصة علامتنا
              </h3>
              <p>
                بدأت رحلتنا بشغفٍ للعطور وتميزها، ورغبة عميقة في صياغة بصمة خاصة
                تضفي على الحياة اليومية لمسة من الأناقة والتميز. قيمنا الجودة:
                استخدام أجود المكونات الطبيعية والآمنة. الابتكار: تصميم عطور
                فريدة لا تُنسى. الاستدامة: التزامنا بالممارسات الصديقة للبيئة في
                جميع مراحل الإنتاج.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-sm md:text-xl text-black">
                ما الذي يجعلنا مميزين؟
              </h3>
              <p>
                عطورنا تمثل مزيجًا متناغمًا من الروائح المميزة التي تناسب كافة
                الأذواق. نحن نقدم تجربة شخصية تجعل من كل زجاجة عطر جزءًا من
                حياتك وذكرياتك. كن جزءًا من حكايتنا العطريةدع عطرنا يروي قصتك
                الفريدة. اكتشف مجموعتنا المميزة الآن ودعنا نصنع ذكريات تدوم إلى
                الأبد.
              </p>
            </div>
            <p className="font-bold text-large text-center">
              "عطر يعكس أناقتك... لأنه أنت."
            </p>


          </div>
        )}
      </div>
      <div className="w-full flex justify-center lg:justify-end relative">
        <div className="w-5/6 sm:w-4/5 md:w-1/2 lg:w-2/3 p-11 md:p-0">
          <img
            className="w-full z-20 rounded-3xl border-3 border-primary"
            src={dbhamz2}
            alt=""
          />
          <div className="absolute top-24 md:top-14 right-5 md:right-20 py-5 w-2/5 flex justify-center items-center ">
            <span className="w-full absolute border-2 h-full rounded-3xl border-primary z-[-1] top-0"></span>
            <img
              className="w-4/5 rounded-3xl border-2 border-primary"
              src={dbhamz1}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
