namespace SignalRDemo.App.Models
{
    using System;

    public class MessageData
    {
        public DateTime Timestamp { get; set; }

        public string From { get; set; }

        public string Message { get; set; }
    }
}