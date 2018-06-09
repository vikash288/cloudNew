package app.services;

import org.springframework.transaction.annotation.Transactional;

import app.dao.AccountRepository;
 
import app.model.Account;
 


public class AccountService {
	
	private AccountRepository accountRepository;
	
	 @Transactional
	 public void createAccount( String account_name ,String account_email ,int account_user_limit,int account_status) {

		 Account account = new Account(account_name,account_email,account_user_limit,account_status);

		 accountRepository.save(account);
	    }

}
