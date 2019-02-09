namespace SignalRDemo.App.Hubs
{
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.SignalR;

    using SignalRDemo.App.Models;

    public interface IChatClient
    {
        Task MessageReceived(MessageData data);
    }

    public class ChatHub : Hub<IChatClient>
    {
        public Task SendMessage(MessageData data)
        {
            return this.Clients.Others.MessageReceived(data);
        }
    }
}