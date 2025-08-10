interface Feature {
  attributes: {
    [key: string]: any; 
  };
}

export function InjectDates(feature: Feature, dateKeys: string[]): Record<string, string | null> {
  const featureIsoDatesObj: Record<string, string | null> = {};
  
  dateKeys.forEach((item) => {
    if (!feature.attributes[item]) {
      featureIsoDatesObj[`${item}_ISO`] = null;
      return;
    }
  
    const inputDate = new Date(feature.attributes[item]);
    // Get the time zone of the input date
    const inputTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // Convert the date to a string with the same time zone and British format (dd-mm-yyyy)
    const result = inputDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: inputTimeZone,
    });
    featureIsoDatesObj[`${item}_ISO`] = result;
  });
  return featureIsoDatesObj;
}
