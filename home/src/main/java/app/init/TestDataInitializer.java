package app.init;


import javax.persistence.EntityManagerFactory;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import app.model.Account;
import app.model.User;
import app.model.UserLog;
import app.model.Job;
import app.model.JobDependent;
import app.model.AWSCredentials;
import app.model.ServerCredentials;
import app.model.ServerType;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * This is a initializing bean that inserts some test data in the database. It is only active in
 * the development profile, to see the data login with user123 / PAssword2 and do a search starting on
 * 1st of January 2015.
 *
 */
@Component
public class TestDataInitializer {

    @Autowired
    private EntityManagerFactory entityManagerFactory;

    Logger LOGGER = LoggerFactory.getLogger(TestDataInitializer.class);

    public void init() throws Exception {

		SessionFactory sessionFactory = entityManagerFactory.unwrap(SessionFactory.class);

        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();

        Account account= new Account("vikash","vikash@gmail.com",4,1);
        session.persist(account);
        //LOGGER.info(account.getAccountid());
        
        //UserRole userrole = new UserRole("Admin");
        //session.persist(userrole);
        
        User user = new User("vikash", "$2a$10$HrO7qJd57sIYAZ7d68CKa.hyeANQNmkLj8vUSnlvC/pjLOhm51G1C", "test@email.com","ADMIN", account);
        //$2a$10$x9vXeDsSC2109FZfIJz.pOZ4dJ056xBpbesuMJg3jZ.ThQkV119t
        //$2a$10$HrO7qJd57sIYAZ7d68CKa.hyeANQNmkLj8vUSnlvC/pjLOhm51G1C
        session.persist(user);
        
         
        
        ServerType st= new ServerType("Test");
        session.persist(st);
        
        AWSCredentials aws=new AWSCredentials(user, "Syra Account","AKIAISEDXKBXS77YYJIQ", "msS5RL0hvnUznFko2ZI9M2MS06Z8H6fSgY+K0Olb",null, 1);
        session.persist(aws);
        
        ServerCredentials Server=new ServerCredentials(user, st,"Server1 ",8080L, "test","test","121.121.2112.1212", null, null, null, null, null, null, null, null, null, null);
        session.persist(Server);
        
        Job jb=new Job(user,Server,Server,st, st, null, "cloudhiti.com","cloudhitiadmin2017", "" );
        session.persist(jb);
        
        JobDependent jb1=new JobDependent(jb, "cloudhiti.com","cloudhitiadmin2017", "", null, null, null, null, null, null, null, null, null, null, 0, null, null, null, null, null, null, null, null, null, null, null, null, null );
        session.persist(jb);
        
        UserLog userlog = new UserLog(user, "Admin", null, null, null, null);
        session.persist(userlog);
         

        transaction.commit();
    }
}
